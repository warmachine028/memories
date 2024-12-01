import { useState } from 'react'
import {
	getPosts,
	createPost,
	deletePost,
	updatePost,
	searchPosts,
	getPost
} from '@/api'
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import { useStore } from '@/store'

export const useGetPosts = () =>
	useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: ({ pageParam }) => getPosts(pageParam, 6),
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})

export const useSearchPosts = (query) =>
	useInfiniteQuery({
		queryKey: ['search-posts', query],
		queryFn: ({ pageParam }) => searchPosts(query, pageParam, 6),
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})

export const useGetPost = (id) =>
	useQuery({
		queryKey: ['post', id],
		queryFn: () => getPost(id)
	})

export const useCreatePost = () => {
	const queryClient = useQueryClient()
	const { openSnackbar } = useStore()
	const queryKey = ['posts']
	const { user } = useUser()

	return useMutation({
		mutationFn: createPost,
		onMutate: async (newPost) => {
			await queryClient.cancelQueries({ queryKey })
			const previousData = queryClient.getQueryData(queryKey)

			const optimisticPost = {
				...newPost,
				id: Date.now(),
				imageUrl: newPost.media,
				author: {
					fullName: user.fullName,
					imageUrl: user.imageUrl
				},
				optimistic: true
			}
			const updatedPages = [
				{
					posts: [optimisticPost],
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
		onError: (error, __, context) => {
			queryClient.setQueryData(queryKey, context?.previousData)
			console.error(error)
			openSnackbar(error, 'error')
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey })
			openSnackbar('Post created Successfully', 'success')
		}
	})
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()
	const queryKey = ['posts']
	const { openSnackbar } = useStore()

	return useMutation({
		mutationFn: updatePost,
		onMutate: async (updatedPost) => {
			await queryClient.cancelQueries({ queryKey })
			const previousData = queryClient.getQueryData(queryKey)

			const optimisticPost = {
				...updatedPost,
				media: '',
				imageUrl: updatedPost.media || updatedPost.imageUrl,
				optimistic: true
			}

			queryClient.setQueryData(queryKey, (old) => {
				if (!old) {
					return { pages: [], pageParams: [] }
				}
				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						posts: page.posts.map((p) =>
							p.id === updatedPost.id ? optimisticPost : p
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey })
			openSnackbar('Post updated Successfully', 'success')
		}
	})
}

export const useDeletePost = () => {
	const queryClient = useQueryClient()
	const { openSnackbar } = useStore()
	const queryKey = ['posts']

	return useMutation({
		mutationFn: deletePost,
		onMutate: async (postId) => {
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
						posts: page.posts.filter((p) => p.id !== postId)
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey })
			openSnackbar('Post deleted Successfully', 'success')
		}
	})
}

export const useRefresh = () => {
	const queryClient = useQueryClient()
	const [refreshing, setRefreshing] = useState(false)
	const queryKey = ['posts']

	return {
		refresh: async () => {
			try {
				setRefreshing(true)
				await queryClient.resetQueries({ queryKey })
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
