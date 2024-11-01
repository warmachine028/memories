import { api, handleApiError } from '@/api'

export const getPostReactions = async (postId) => {
	try {
		const { data } = await api.get(`/reactions/posts/top-reactors/${postId}`)
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}
