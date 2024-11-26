import { api, handleApiError } from '.'

export const getComments = async (postId, cursor, limit) => {
	try {
		const { data } = await api.get(`/comments/${postId}`, {
			params: { cursor, limit }
		})
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const createComment = async (postId, comment) => {
	try {
		const { data } = await api.post(`/comments/${postId}`, comment)
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const deleteComment = async (id) => {
	try {
		await api.delete(`/comments/${id}`)
	} catch (error) {
		throw handleApiError(error)
	}
}

