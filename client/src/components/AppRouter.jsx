import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Posts, LogIn, NotFound, SignUp, ForgotPassword, ResetPassword } from '../pages'
import { AuthRoute, PrivateRoute } from '../routes'

const AppRouter = () => {
	const location = useLocation()
	return (
		<Routes location={location}>
			<Route path="/" element={<Navigate to="/posts" />} />
			<Route path="/posts" element={<Posts />} />
			<Route path="/login" element={<AuthRoute component={<LogIn />} />} />
			<Route path="/signup" element={<AuthRoute component={<SignUp />} />} />
			<Route path="/forgot-password" element={<AuthRoute component={<ForgotPassword />} />} />
			<Route path="/reset-password" element={<AuthRoute component={<ResetPassword />} />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default AppRouter
