import {
	getCommentLikes,
	getTop3PostReactors,
	likeComment,
	reactPost,
	unlikeComment,
	unreactPost
} from '@/api'
import { useUser } from '@clerk/clerk-react'
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { useStore } from '@/store'

export const useGetPostReactions = (postId) => {
	return useQuery({
		queryKey: ['postReactions', postId],
		queryFn: () => getTop3PostReactors(postId)
	})
}

export const useGetCommentLikes = (commentId) => {
	return useQuery({
		queryKey: ['like-info', commentId],
		queryFn: () => getCommentLikes(commentId)
	})
}

export const useLikeComment = () => {
	const queryClient = useQueryClient()
	const { openSnackbar } = useStore()

	return useMutation({
		mutationFn: ({ commentId, isLiked }) =>
			isLiked ? unlikeComment(commentId) : likeComment(commentId),
		onMutate: async ({ commentId }) => {
			const queryKey = ['like-info', commentId]
			await queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)
			queryClient.setQueryData(queryKey, () => ({
				likes:
					(previousData?.likes || 0) +
					(previousData?.isLiked ? -1 : 1),
				isLiked: !previousData?.isLiked
			}))
			return { previousData }
		},
		onError: (error, { commentId }, context) => {
			queryClient.setQueryData(
				['like-info', commentId],
				context?.previousData
			)
			console.error(error)
			openSnackbar('Something went wrong. Please try again.', 'error')
		}
	})
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

export const useGetLikedUsers = (commentId) => {
	return useInfiniteQuery({
		queryKey: ['liked-users', commentId],
		queryFn: ({ pageParam = 0 }) => {
			const pageSize = 10
			const start = pageParam * pageSize
			const end = start + pageSize
			const dummyUsers = Array.from({ length: pageSize }, (_, i) => ({
				id: start + i + 1,
				name: `User ${start + i + 1}`,
				avatarColor: `hsl(${Math.random() * 360}, 70%, 50%)`
			}))
			return {
				users: dummyUsers,
				nextPage: end < 100 ? pageParam + 1 : undefined // Limit to 100 dummy users
			}
		},
		getNextPageParam: (lastPage) => lastPage.nextPage
	})
}
