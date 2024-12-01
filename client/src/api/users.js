import { api, handleApiError } from '.'

export const getUser = async (id) => {
	try {
		const { data } = await api.get(`/users/${id}`)
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const getUserStats = async (id) => {
	try {
		const { data } = await api.get(`/users/${id}/stats`)
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

