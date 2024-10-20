import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@/contexts'
import { api } from '@/api'
import { useAuth } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { updateAuthToken } from '@/reducers/auth'

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

export const useApiWithAuth = () => {
	const { getToken, isLoaded } = useAuth()
	const dispatch = useDispatch()
	const [isAuthLoaded, setIsAuthLoaded] = useState(false)

	useEffect(() => {
		const updateToken = async () => {
			if (isLoaded) {
				try {
					const token = await getToken()
					if (token) {
						dispatch(updateAuthToken(token))
						setIsAuthLoaded(true)
					} else {
						setIsAuthLoaded(false)
					}
				} catch (error) {
					console.error('Error getting token:', error)
					setIsAuthLoaded(false)
				}
			}
		}
		updateToken()
	}, [getToken, isLoaded, dispatch])
	// Create a new API instance with the current auth state
	const authenticatedApi = api.enhanceEndpoints({
		addTagTypes: ['AuthenticatedPost'],
		endpoints: (builder) => ({
			getPosts: builder.query({
				...builder.query.getPosts,
				providesTags: ['AuthenticatedPost']
			})
			// ... other endpoints
		})
	})
	return { isLoaded, isAuthLoaded, api: authenticatedApi }
}
