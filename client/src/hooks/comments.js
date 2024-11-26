import {
	getComments,
	createComment,
	deleteComment,
	likeComment,
	unlikeComment
} from '@/api'
import { useUser } from '@clerk/clerk-react'
import {
	useQueryClient,
	useMutation,
	useInfiniteQuery
} from '@tanstack/react-query'

export const useGetComments = (postId) => {
	return useInfiniteQuery({
		queryKey: ['comments', postId],
		queryFn: ({ pageParam }) => getComments(postId, pageParam, 5),
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})
}

export const useCreateComment = (postId) => {
	const queryClient = useQueryClient()
	const { user } = useUser()

	return useMutation({
		mutationFn: (newComment) => createComment(postId, newComment),
		onMutate: async (newComment) => {
			await queryClient.cancelQueries({
				queryKey: ['comments', postId]
			})
			const previousData = queryClient.getQueryData(['comments', postId])

			const optimisticComment = {
				...newComment,
				id: Date.now(),
				author: {
					fullName: user.fullName,
					imageUrl: user.imageUrl
				},
				likeCount: 0,
				optimistic: true
			}
			const updatedPages = [
				{
					comments: [optimisticComment],
					nextCursor: previousData?.nextCursor
				},
				...previousData?.pages
			]
			queryClient.setQueryData(['comments', postId], (old) => ({
				...(old ?? { pageParams: [] }),
				pages: updatedPages
			}))

			return { previousData }
		},
		onError: (_, __, context) => {
			const previousPages = context?.previousData?.pages ?? []
			queryClient.setQueryData(
				['comments', postId],
				context?.previousData
			)
			setPages(previousPages)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['comments', postId]
			})
	})
}

export const useDeleteComment = (postId) => {
	const queryClient = useQueryClient()
	const queryKey = ['comments', postId]

	return useMutation({
		mutationFn: deleteComment,
		onMutate: async (commentId) => {
			await queryClient.cancelQueries({ queryKey })
			const previousData = queryClient.getQueryData(queryKey)

			queryClient.setQueryData(queryKey, (old) => {
				if (!old) {
					return { pages: [], pageParams: [] }
				}
				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						comments: page.comments.filter(
							(c) => c.id !== commentId
						)
					}))
				}
			})

			return { previousData }
		},
		onError: (_, __, context) =>
			queryClient.setQueryData(queryKey, context?.previousData),
		onSuccess: () => queryClient.invalidateQueries({ queryKey })
	})
}

