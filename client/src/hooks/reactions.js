import {
	getCommentLikes,
	getPostReactions,
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
import { reactions } from '@/data'

export const useGetTop3Reacts = (postId) => {
	return useQuery({
		queryKey: ['top-reactors', postId],
		queryFn: () => getTop3PostReactors(postId)
	})
}

export const useGetPostReactions = (postId) => {
	return useQuery({
		queryKey: ['reaction-info', postId],
		queryFn: () => getPostReactions(postId),
		staleTime: Infinity
	})
}

export const useGetCommentLikes = (commentId) => {
	return useQuery({
		queryKey: ['like-info', commentId],
		queryFn: () => getCommentLikes(commentId),
		staleTime: Infinity
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
				likeCount:
					(previousData?.likeCount || 0) +
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
	const { openSnackbar } = useStore()

	return useMutation({
		mutationFn: ({ postId, type }) =>
			type ? reactPost(postId, type) : unreactPost(postId),
		onMutate: async ({ postId, type }) => {
			const queryKey = ['reaction-info', postId]
			await queryClient.cancelQueries({ queryKey })
			const previousData = queryClient.getQueryData(queryKey)

			// if already reacted, and type reaction is not null, don't update reaction count
			// if already reacted, and type reaction is null, decrease reaction count
			// if not reacted, increase reaction count
			queryClient.setQueryData(queryKey, () => ({
				reactionCount:
					previousData?.reactionType && type
						? previousData.reactionCount
						: (previousData?.reactionCount || 0) + (type ? 1 : -1),
				reactionType: type
			}))

			return { previousData }
		},
		onError: (error, { postId }, context) => {
			queryClient.setQueryData(
				['reaction-info', postId],
				context?.previousData
			)
			console.error(error)
			openSnackbar('Something went wrong. Please try again.', 'error')
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
				fullName: `John Doe ${start + i + 1}`,
				imageUrl: `https://i.pravatar.cc?u=${start + i + 1}`,
				reaction: reactions[start + (i % 5)].label
			}))
			return {
				users: dummyUsers,
				nextPage: end < 100 ? pageParam + 1 : undefined // Limit to 100 dummy users
			}
		},
		getNextPageParam: (lastPage) => lastPage.nextPage
	})
}
