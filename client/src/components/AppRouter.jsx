import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Posts, LogIn, NotFound, SignUp, ForgotPassword, ResetPassword, Profile, PlayGround, Post, UpdateUser } from '../pages'
import { AuthRoute, PrivateRoute } from '../routes'

const AppRouter = () => {
	const location = useLocation()
	return (
		<Routes location={location}>
			<Route path="/" element={<Navigate to="/post" />} />
			<Route path="/post" element={<Posts />} />
			<Route path="/post/:id" element={<Post />} />
			<Route path="/playground" element={<PlayGround />} />
			<Route path="/user" element={<PrivateRoute component={<Profile />} />} />
			<Route path="/user/update" element={<PrivateRoute component={<UpdateUser />} />} />
			<Route path="/user/:id" element={<Profile />} />
			<Route path="/login" element={<AuthRoute component={<LogIn />} />} />
			<Route path="/signup" element={<AuthRoute component={<SignUp />} />} />
			<Route path="/forgot-password" element={<AuthRoute component={<ForgotPassword />} />} />
			<Route path="/reset-password" element={<AuthRoute component={<ResetPassword />} />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default AppRouter
