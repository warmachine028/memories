import { useEffect, useState } from 'react'
import { createPost, deletePost, getPost, getPosts, reactPost, searchPosts, unreactPost, updatePost } from '@/api'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
				reactionCount: 0
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
		onError: (_err, _newPost, context) => {
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

			// Update both states
			const newPages = pages.map((page) => ({
				...page,
				posts: page.posts.map((post) => (post.id === updatedPost.id ? { ...post, ...updatedPost } : post))
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
						posts: page.posts.filter((post) => post.id !== postId)
					}))
				}
			})

			return { previousData }
		},
		onError: (_err, _postId, context) => queryClient.setQueryData(['posts'], context?.previousData),
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

	return useMutation({
		mutationFn: ({ postId, type }) => reactPost(postId, type),
		onMutate: async ({ postId, type }) => {
			await queryClient.cancelQueries({ queryKey: ['posts'] })
			const previousData = queryClient.getQueryData(['posts'])

			// Update both states with optimistic update
			const newPages = pages.map((page) => ({
				...page,
				posts: page.posts.map((post) => {
					if (post.id === postId) {
						return {
							...post,
							reactionCount: post.reactionCount++,
							reactions: [...post.reactions, { reactionType: type }]
						}
					}
					return post
				})
			}))

			queryClient.setQueryData(['posts'], (old) => ({
				...(old ?? { pageParams: [] }),
				pages: newPages
			}))
			setPages(newPages)

			return { previousData }
		},
		onError: (_err, _variables, context) => {
			const previousPages = context?.previousData?.pages ?? []
			queryClient.setQueryData(['posts'], context?.previousData)
			setPages(previousPages)
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
	})
}

export const useUnreactPost = () => {
	const queryClient = useQueryClient()
	const { pages, setPages } = useStore()
	return useMutation({
		mutationFn: (postId) => unreactPost(postId),
		onMutate: async (postId) => {
			await queryClient.cancelQueries({ queryKey: ['posts'] })
			const previousData = queryClient.getQueryData(['posts'])
			const newPages = pages.map((page) => ({
				...page,
				posts: page.posts.map((post) => {
					if (post.id === postId) {
						return {
							...post,
							reactionCount: post.reactionCount--,
							reactions: [{ reactionType: null }]
						}
					}
					return post
				})
			}))
			queryClient.setQueryData(['posts'], (old) => ({
				...(old ?? { pageParams: [] }),
				pages: newPages
			}))
			setPages(newPages)

			return { previousData }
		},
		onError: (_err, _postId, context) => {
			const previousPages = context?.previousData?.pages ?? []
			queryClient.setQueryData(['posts'], context?.previousData)
			setPages(previousPages)
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
	})
}
