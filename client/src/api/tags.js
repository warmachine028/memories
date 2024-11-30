import { api, handleApiError } from '@/api'
import { movies } from '@/data'
import { sleep } from '@/lib/utils'

export const getTrendingTags = async () => {
	try {
		const { data } = await api.get('/tags/trending')
		return data
	} catch (error) {
		throw handleApiError(error)
	}
}

export const searchTags = async (searchTerm) => {
	try {
		// Filter movies based on search term
		return movies
			.filter((movie) =>
				movie.title
					.toLowerCase()
					.includes(searchTerm?.toLowerCase() || '')
			)
			.map((movie) => movie.title)
	} catch (error) {
		throw handleApiError(error)
	}
}
