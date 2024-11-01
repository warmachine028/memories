// import { sleep } from '@/lib/utils'
import { api, handleApiError } from '@/api'

export const getPosts = async (cursor, limit) => {
	try {
		// await sleep(6000)
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
		const { data } = await api.post('/posts', post)
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
		console.error(error)
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
		await api.post(`/reactions/posts/${id}`, { reactionType: reaction })
	} catch (error) {
		throw handleApiError(error)
	}
}

export const unreactPost = async (id) => {
	try {
		await api.delete(`/reactions/posts/${id}`)
	} catch (error) {
		throw handleApiError(error)
	}
}
