import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { useStore } from '@/store'

const createApi = (getToken, isLoaded) => {
	const api = axios.create({
		baseURL: import.meta.env.VITE_API_URL
	})

	api.interceptors.request.use(async (config) => {
		if (!isLoaded) {
			throw new Error('Authentication is still loading')
		}
		const token = await getToken()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	})

	api.interceptors.response.use(
		(response) => response,
		(error) => {
			const openSnackbar = useStore.getState().openSnackbar
			openSnackbar(error.response?.data?.message || 'An error occurred', 'error')
			return Promise.reject(error)
		}
	)

	return api
}

export const useApi = () => {
	const { getToken, isLoaded } = useAuth()
	const api = createApi(getToken, isLoaded)

	const makeRequest = async (requestFn) => {
		if (!isLoaded) {
			throw new Error('Authentication is still loading')
		}
		try {
			return await requestFn()
		} catch (error) {
			console.error('API Error:', error)
			throw error
		}
	}

	return {
		getPosts: ({ cursor, limit }) => makeRequest(() => api.get('/posts', { params: { cursor, limit } }).then((response) => response.data)),

		getPostById: (id) => makeRequest(() => api.get(`/posts/${id}`).then((response) => response.data)),

		createPost: (post) => makeRequest(() => api.post('/posts', post).then((response) => response.data)),

		updatePost: ({ id, ...post }) => makeRequest(() => api.patch(`/posts/${id}`, post).then((response) => response.data)),

		deletePost: (id) => makeRequest(() => api.delete(`/posts/${id}`).then(() => id))
	}
}
