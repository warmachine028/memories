import { sleep } from '@/lib/utils'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
const api = axios.create({ baseURL })

api.interceptors.request.use(async (req) => {
	try {
		const session = await window.Clerk.session
		if (!session) {
			// not logged in
			return req
		}
		const token = await session.getToken()
		if (token) {
			req.headers.Authorization = `Bearer ${token}`
		}
	} catch (error) {
		console.error('Auth interceptor error:', error)
	} finally {
		return req
	}
})

const handleApiError = (error) => {
	if (axios.isAxiosError(error)) {
		const message = error.response?.data?.message || error.message
		console.error('API Error:', {
			status: error.response?.status,
			message,
			details: error.response?.data
		})
		throw new Error(`API Error: ${message}`)
	}
	console.error('Unexpected error:', error)
	throw error
}

export const getPosts = async (cursor, limit) => {
	try {
		const { data } = await api.get('/posts', { params: { cursor, limit } })
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const searchPosts = async (query) => {
	try {
		const { data } = await api.get('/posts/search', { params: { query } })
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const getPost = async (id) => {
	try {
		const { data } = await api.get(`/posts/${id}`)
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const createPost = async (post) => {
	try {
		await sleep(4000)
		// const { data } = await api.post('/posts', post)
		const data = post
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const updatePost = async (id, post) => {
	try {
		const { data } = await api.put(`/posts/${id}`, post)
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const deletePost = async (id) => {
	try {
		await api.delete(`/posts/${id}`)
	} catch (error) {
		throw handleApiError(error)
	}
}

export const reactPost = async (id, reaction) => {
	try {
		const { data } = await api.post(`/posts/${id}/react`, reaction)
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const unreactPost = async (id) => {
	try {
		await api.delete(`/posts/${id}/react`)
	} catch (error) {
		throw handleApiError(error)
	}
}
