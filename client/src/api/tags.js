import { api, handleApiError } from '.'

export const getTrendingTags = async () => {
	try {
		const { data } = await api.get('/tags/trending')
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const searchTags = async (q) => {
	try {
		const { data } = await api.get('/tags/search', {
			params: { q }
		})
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const searchPostsByTags = async (tag, cursor, limit) => {
	try {
		const { data } = await api.get(`/tags/posts/${tag}`, {
			params: { cursor, limit }
		})
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}
