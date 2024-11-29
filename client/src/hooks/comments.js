import { getComments, createComment, deleteComment, updateComment } from '@/api'
import { useUser } from '@clerk/clerk-react'
import {
	useQueryClient,
	useMutation,
	useInfiniteQuery
} from '@tanstack/react-query'
import { useStore } from '@/store'

export const useGetComments = (postId) => {
	return useInfiniteQuery({
		queryKey: ['comments', postId],
		queryFn: ({ pageParam }) => getComments(postId, pageParam, 5),
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})
}

export const useCreateComment = (postId) => {
	const queryClient = useQueryClient()
	const queryKey = ['comments', postId]
	const { user } = useUser()

	return useMutation({
		mutationFn: (newComment) => createComment(postId, newComment),
		onMutate: async (newComment) => {
			await queryClient.cancelQueries({ queryKey })
			const previousData = queryClient.getQueryData(queryKey)

			const optimisticComment = {
				...newComment,
				id: Date.now(),
				likes: [],
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
			queryClient.setQueryData(queryKey, (old) => ({
				...(old ?? { pageParams: [] }),
				pages: updatedPages
			}))

			return { previousData }
		},
		onError: (_, __, context) =>
			queryClient.setQueryData(queryKey, context?.previousData),
		onSuccess: () => queryClient.invalidateQueries({ queryKey })
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

export const useUpdateComment = (postId) => {
	const queryClient = useQueryClient()
	const queryKey = ['comments', postId]
	const { openSnackbar } = useStore()

	return useMutation({
		mutationFn: updateComment,
		onMutate: async (comment) => {
			await queryClient.cancelQueries({ queryKey })
			const previousData = queryClient.getQueryData(queryKey)

			const optimisticComment = { ...comment, optimistic: true }
			queryClient.setQueryData(queryKey, (old) => {
				if (!old) {
					return { pages: [], pageParams: [] }
				}

				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						comments: page.comments.map((c) =>
							c.id === comment.id ? optimisticComment : c
						)
					}))
				}
			})

			return { previousData }
		},
		onError: (error, __, context) => {
			queryClient.setQueryData(queryKey, context?.previousData)
			console.error(error)
			openSnackbar(error, 'error')
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey })
			openSnackbar('Comment updated Successfully', 'success')
		}
	})
}
