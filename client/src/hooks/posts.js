import { useEffect, useState } from 'react'
import {
	createPost,
	deletePost,
	getPost,
	getPosts,
	reactPost,
	searchPosts,
	unreactPost,
	updatePost
} from '@/api'
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { useStore } from '@/store'
import { useUser } from '@clerk/clerk-react'

export const useGetPosts = () => {
	const { setPages } = useStore()

	const query = useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: ({ pageParam }) => getPosts(pageParam, 10),
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})

	useEffect(() => {
		if (query.data?.pages) {
			setPages(query.data.pages)
		}
	}, [query.data?.pages, setPages])

	return query
}

export const useGetPost = (id) => {
	return useQuery({
		queryKey: ['post', id],
		queryFn: () => getPost(id)
	})
}

export const useCreatePost = () => {
	const queryClient = useQueryClient()
	const { pages, setPages } = useStore()
	const { user } = useUser()

	return useMutation({
		mutationFn: createPost,
		onMutate: async (newPost) => {
			await queryClient.cancelQueries({ queryKey: ['posts'] })
			const previousData = queryClient.getQueryData(['posts'])

			const optimisticPost = {
				...newPost,
				imageUrl: newPost.media,
				id: Date.now(),
				tags: newPost.tags.map((tag) => ({ tag: { name: tag } })),
				reactions: [],
				author: {
					fullName: user.fullName,
					imageUrl: user.imageUrl
				},
				reactionCount: 0,
				optimistic: true
			}
			const updatedPages = [
				{
					posts: [optimisticPost],
					nextCursor: pages[0]?.nextCursor
				},
				...pages
			]

			queryClient.setQueryData(['posts'], (old) => ({
				...(old ?? { pageParams: [] }),
				pages: updatedPages
			}))
			setPages(updatedPages)

			return { previousData }
		},
		onError: (_, __, context) => {
			const previousPages = context?.previousData?.pages ?? []
			queryClient.setQueryData(['posts'], context?.previousData)
			setPages(previousPages)
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
	})
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()
	const { pages, setPages } = useStore()

	return useMutation({
		mutationFn: (post) => updatePost(post.id, post),
		onMutate: async (updatedPost) => {
			await queryClient.cancelQueries({ queryKey: ['posts'] })
			const previousData = queryClient.getQueryData(['posts'])

			const newPages = pages.map((page) => ({
				...page,
				posts: page.posts.map((post) =>
					post.id === updatedPost.id
						? {
								...post,
								...updatedPost,
								media: '',
								imageUrl:
									updatedPost.media || updatedPost.imageUrl,
								optimistic: true
							}
						: post
				)
			}))
			queryClient.setQueryData(['posts'], (old) => ({
				...(old ?? { pageParams: [] }),
				pages: newPages
			}))
			setPages(newPages)

			return { previousData }
		},
		onError: (_err, _updatedPost, context) => {
			const previousPages = context?.previousData?.pages ?? []
			queryClient.setQueryData(['posts'], context?.previousData)
			setPages(previousPages)
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
	})
}

export const useDeletePost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: deletePost,
		onMutate: async (postId) => {
			await queryClient.cancelQueries({ queryKey: ['posts'] })
			const previousData = queryClient.getQueryData(['posts'])

			queryClient.setQueryData(['posts'], (old) => {
				if (!old) {
					return { pages: [], pageParams: [] }
				}
				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						posts: page.posts.filter((p) => p.id !== postId)
					}))
				}
			})

			return { previousData }
		},
		onError: (_, __, context) =>
			queryClient.setQueryData(['posts'], context?.previousData),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
	})
}

export const useSearchPosts = () => {
	return useQuery({
		queryKey: ['searchPosts'],
		queryFn: () => searchPosts
	})
}

export const useRefresh = () => {
	const queryClient = useQueryClient()
	const { setPages } = useStore()
	const [refreshing, setRefreshing] = useState(false)

	return {
		refresh: async () => {
			try {
				setRefreshing(true)
				setPages([])

				await queryClient.resetQueries({ queryKey: ['posts'] })

				return true
			} catch (error) {
				console.error('Failed to refresh:', error)
				return false
			} finally {
				setRefreshing(false)
			}
		},
		refreshing
	}
}

export const useReactPost = () => {
	const queryClient = useQueryClient()
	const { pages, setPages } = useStore()
	const { user } = useUser()

	return useMutation({
		mutationFn: ({ postId, type }) =>
			type ? reactPost(postId, type) : unreactPost(postId),
		onMutate: async ({ postId, type }) => {
			// Cancel any outgoing refetches
			await Promise.all([
				queryClient.cancelQueries({ queryKey: ['posts'] }),
				queryClient.cancelQueries({ queryKey: ['reactions', postId] }),
				queryClient.cancelQueries({ queryKey: ['post', postId] })
			])

			const previousData = {
				posts: queryClient.getQueryData(['posts']),
				reactions: queryClient.getQueryData(['reactions', postId]),
				post: queryClient.getQueryData(['post', postId])
			}

			// Optimistically update posts
			const newPages = pages.map((page) => ({
				...page,
				posts: page.posts.map((post) =>
					post.id === postId
						? {
								...post,
								reactionCount:
									post.reactions.length === 0 && type
										? post.reactionCount + 1
										: type === null
											? Math.max(
													0,
													post.reactionCount - 1
												)
											: post.reactionCount,
								reactions: type ? [{ reactionType: type }] : []
							}
						: post
				)
			}))

			// Update posts data
			queryClient.setQueryData(['posts'], (old) => ({
				...(old ?? { pageParams: [] }),
				pages: newPages
			}))
			setPages(newPages)

			// Optimistically update reactions if they're being displayed
			if (previousData.reactions) {
				const optimisticReaction = type
					? {
							postId,
							reactionType: type,
							user: {
								id: user.id,
								fullName: user.fullName,
								imageUrl: user.imageUrl
							},
							createdAt: new Date().toISOString()
						}
					: null

				queryClient.setQueryData(['reactions', postId], (old) => ({
					...old,
					reactions: type
						? [optimisticReaction, ...(old?.reactions || [])]
						: (old?.reactions || []).filter(
								(r) => r.user.id !== user.id
							)
				}))
			}

			return { previousData }
		},
		onError: (_err, { postId }, context) => {
			// Revert both posts and reactions on error
			queryClient.setQueryData(['posts'], context?.previousData.posts)
			queryClient.setQueryData(
				['reactions', postId],
				context?.previousData.reactions
			)
			queryClient.setQueryData(
				['post', postId],
				context?.previousData.post
			)
			setPages(context?.previousData.posts?.pages ?? [])
		},
		onSuccess: (_data, { postId }) => {
			// Invalidate affected queries
			return Promise.all([
				queryClient.invalidateQueries({ queryKey: ['posts'] }),
				queryClient.invalidateQueries({
					queryKey: ['reactions', postId]
				}),
				queryClient.invalidateQueries({ queryKey: ['post', postId] })
			])
		}
	})
}
