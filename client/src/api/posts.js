import { api, handleApiError } from '.'

export const getPosts = async (cursor, limit) => {
	try {
		const { data } = await api.get('/posts', { params: { cursor, limit } })
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const searchPosts = async (query, cursor, limit) => {
	try {
		const { data } = await api.get('/posts/search', {
			params: { query, cursor, limit }
		})
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

export const updatePost = async (post) => {
	try {
		const { data } = await api.put(`/posts/${post.id}`, post)
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
