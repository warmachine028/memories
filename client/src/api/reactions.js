import { api, handleApiError } from '@/api'
import { sleep } from '@/lib/utils'

export const getTop3PostReactors = async (postId) => {
	try {
		const { data } = await api.get(
			`/reactions/posts/top-reactors/${postId}`
		)
		return data
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

export const getCommentLikes = async (id) => {
	try {
		const { data } = await api.get(`/reactions/comments/${id}`)
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const likeComment = async (id) => {
	try {
		await api.post(`/reactions/comments/${id}`)
	} catch (error) {
		throw handleApiError(error)
	}
}

export const unlikeComment = async (id) => {
	try {
		await api.delete(`/reactions/comments/${id}`)
	} catch (error) {
		throw handleApiError(error)
	}
}
