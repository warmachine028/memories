import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router'

const Auth = ({ component }) => {
	const { isLoaded, isSignedIn } = useAuth()

	if (!isLoaded) {
		return null
	}
	return isSignedIn ? <Navigate to="/" /> : component
}

export default Auth
