import { getComments, createComment, deleteComment } from '@/api'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

export const useGetComments = (postId, pageParam) => {
	return useQuery({
		queryKey: ['comments', postId, pageParam],
		queryFn: () => getComments(postId, pageParam)
	})
}

export const useCreateComment = () => {
	const queryClient = useQueryClient()
	const { user } = useUser()

	return useMutation({
		mutationFn: createComment,
		onMutate: async (newComment) => {
			await queryClient.cancelQueries({
				queryKey: ['comments', newComment.postId]
			})
			const previousData = queryClient.getQueryData([
				'comments',
				newComment.postId
			])
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
			queryClient.setQueryData(
				['comments', newComment.postId],
				(old) => ({
					...(old ?? { pageParams: [] }),
					pages: updatedPages
				})
			)

			return { previousData }
		},
		onError: (_err, newComment, context) => {
			const previousPages = context?.previousData?.pages ?? []
			queryClient.setQueryData(
				['comments', newComment.postId],
				context?.previousData
			)
			setPages(previousPages)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['comments', newComment.postId]
			})
	})
}

export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (comment) => deleteComment(comment.id),
		onMutate: async (comment) => {
			await queryClient.cancelQueries({
				queryKey: ['comments', comment.postId]
			})
			const previousData = queryClient.getQueryData([
				'comments',
				comment.postId
			])

			queryClient.setQueryData(['comments', comment.postId], (old) => {
				if (!old) {
					return { pages: [], pageParams: [] }
				}
				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						comments: page.comments.filter(
							(c) => c.id !== comment.id
						)
					}))
				}
			})

			return { previousData }
		},
		onError: (_, comment, context) =>
			queryClient.setQueryData(
				['comments', comment.postId],
				context?.previousData
			),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['comments', comment.postId]
			})
	})
}
