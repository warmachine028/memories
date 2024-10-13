import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// import { Posts, LogIn, NotFound, SignUp, ForgotPassword, ResetPassword, Profile, Playground, Post, UpdateUser } from '../pages'
// const Posts = lazy(() => import('../pages/Posts'))
// const LogIn = lazy(() => import('../pages/LogIn'))
const { Posts, LogIn, NotFound, SignUp, ForgotPassword, VerifyEmail, Profile, Playground, Post, UpdateUser } = {
	Posts: lazy(() => import('@/pages/Posts')),
	LogIn: lazy(() => import('@/pages/LogIn')),
	NotFound: lazy(() => import('@/pages/NotFound')),
	SignUp: lazy(() => import('@/pages/SignUp')),
	ForgotPassword: lazy(() => import('@/pages/ForgotPassword')),
	VerifyEmail: lazy(() => import('@/pages/VerifyEmail')),
	Profile: lazy(() => import('@/pages/Profile')),
	Playground: lazy(() => import('@/pages/Playground')),
	Post: lazy(() => import('@/pages/Post')),
	UpdateUser: lazy(() => import('@/pages/UpdateUser'))
}
import { AuthRoute, PrivateRoute } from '@/routes'
import { SuspenseFallback } from '.'

const AppRouter = () => {
	const location = useLocation()
	return (
		<Suspense fallback={<SuspenseFallback />}>
			<Routes location={location}>
				<Route path="/" element={<Navigate to="/posts" />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/playground" element={<Playground />} />
				<Route path="/user" element={<PrivateRoute component={<Profile />} />} />
				<Route path="/user/update" element={<PrivateRoute component={<UpdateUser />} />} />
				<Route path="/user/:id" element={<Profile />} />
				<Route path="/login" element={<AuthRoute component={<LogIn />} />} />
				<Route path="/forgot-password" element={<AuthRoute component={<ForgotPassword />} />} />
				<Route path="/signup" element={<AuthRoute component={<SignUp />} />} />
				<Route path="/verify-email" element={<AuthRoute component={<VerifyEmail />} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

export default AppRouter
