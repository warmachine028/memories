import { api, handleApiError } from '@/api'

export const getTrendingTags = async () => {
    try {
        const { data } = await api.get('/tags/trending')
        return data
    } catch (error) {
		throw handleApiError(error)
    }
}

