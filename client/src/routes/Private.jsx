import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

const Private = ({ component }) => {
	const { isLoaded, isSignedIn } = useAuth()
	if (!isLoaded) {
		return null
	}
	return isSignedIn ? component : <Navigate to="/login" />
}

export default Private
