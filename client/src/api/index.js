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
	}
	return req
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

export { api, handleApiError }
export * from './posts'
export * from './users'
export * from './reactions'
export * from './comments'
