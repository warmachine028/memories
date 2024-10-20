import { useContext } from 'react'
import { ThemeContext } from '@/contexts'
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { useStore } from '@/store'
import { useApi } from '@/api/posts'
import { useAuth } from '@clerk/clerk-react'

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

export const useGetPosts = (initialCursor, limit) => {
	const setPosts = useStore((state) => state.setPosts)
	const api = useApi()
	const { isLoaded } = useAuth()

	return useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: ({ pageParam = initialCursor }) => api.getPosts({ cursor: pageParam, limit }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		onSuccess: (data) => {
			const allPosts = data.pages.flatMap((page) => page.posts)
			setPosts(allPosts)
		},
		enabled: isLoaded
	})
}

export const useGetPostById = (id) => {
	const api = useApi()
	const { isLoaded } = useAuth()

	return useQuery({
		queryKey: ['post', id],
		queryFn: () => api.getPostById(id),
		enabled: isLoaded && !!id
	})
}

export const useCreatePost = () => {
	const queryClient = useQueryClient()
	const addPost = useStore((state) => state.addPost)
	const api = useApi()

	return useMutation({
		mutationFn: api.createPost,
		onMutate: async (newPost) => {
			await queryClient.cancelQueries(['posts'])
			const previousPosts = queryClient.getQueryData(['posts'])
			const tempId = 'temp_' + new Date().getTime()
			addPost({ ...newPost, id: tempId })
			return { previousPosts, tempId }
		},
		onSuccess: (data, variables, context) => {
			queryClient.setQueryData(['posts'], (old) => {
				if (!old) return { pages: [{ posts: [data] }], pageParams: [null] }
				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						posts: page.posts.map((post) => (post.id === context.tempId ? data : post))
					}))
				}
			})
		},
		onError: (err, newPost, context) => {
			queryClient.setQueryData(['posts'], context.previousPosts)
		},
		onSettled: () => {
			queryClient.invalidateQueries(['posts'])
		}
	})
}

export const useDeletePost = () => {
	const queryClient = useQueryClient()
	const removePost = useStore((state) => state.removePost)
	const api = useApi()
	return useMutation({
		mutationFn: api.deletePost,
		onMutate: async (id) => {
			await queryClient.cancelQueries(['posts'])
			const previousPosts = queryClient.getQueryData(['posts'])
			removePost(id)
			return { previousPosts }
		},
		onError: (err, id, context) => {
			queryClient.setQueryData(['posts'], context.previousPosts)
		},
		onSettled: () => {
			queryClient.invalidateQueries(['posts'])
		}
	})
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()
	const updatePost = useStore((state) => state.updatePost)
	const api = useApi()

	return useMutation({
		mutationFn: api.updatePost,
		onMutate: async (updatedPost) => {
			await queryClient.cancelQueries(['posts'])
			const previousPosts = queryClient.getQueryData(['posts'])
			updatePost(updatedPost)
			return { previousPosts }
		},
		onError: (err, updatedPost, context) => {
			queryClient.setQueryData(['posts'], context.previousPosts)
		},
		onSettled: () => {
			queryClient.invalidateQueries(['posts'])
		}
	})
}
