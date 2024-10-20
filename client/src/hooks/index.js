import { useContext, useEffect } from 'react'
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

	const updateToken = async () => {
		if (isLoaded) {
			try {
				const token = await getToken()
				if (token) {
					dispatch(updateAuthToken(token))
				}
			} catch (error) {
				console.error('Error getting token:', error)
			}
		}
	}
	useEffect(() => {
		updateToken()
	}, [getToken, isLoaded, dispatch])

	return { isLoaded }
}
