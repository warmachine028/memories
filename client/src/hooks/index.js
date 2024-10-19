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
	const { getToken } = useAuth()
	const dispatch = useDispatch()

	const updateToken = async () => {
		const token = await getToken()

		if (token) {
			dispatch(updateAuthToken(token))
		}
	}
	useEffect(() => {
		updateToken()
	}, [getToken])
	return api
}
