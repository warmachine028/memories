import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// import { Posts, LogIn, NotFound, SignUp, ForgotPassword, ResetPassword, Profile, Playground, Post, UpdateUser } from '../pages'
// const Posts = lazy(() => import('../pages/Posts'))
// const LogIn = lazy(() => import('../pages/LogIn'))
const { Posts, LogIn, NotFound, SignUp, ForgotPassword, ResetPassword, Profile, Playground, Post, UpdateUser } = {
	Posts: lazy(() => import('@/pages/Posts')),
	LogIn: lazy(() => import('@/pages/LogIn')),
	NotFound: lazy(() => import('@/pages/NotFound')),
	SignUp: lazy(() => import('@/pages/SignUp')),
	ForgotPassword: lazy(() => import('@/pages/ForgotPassword')),
	ResetPassword: lazy(() => import('@/pages/ResetPassword')),
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
				<Route path="/" element={<Navigate to="/post" />} />
				<Route path="/post" element={<Posts />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/playground" element={<Playground />} />
				<Route path="/user" element={<PrivateRoute component={<Profile />} />} />
				<Route path="/user/update" element={<PrivateRoute component={<UpdateUser />} />} />
				<Route path="/user/:id" element={<Profile />} />
				<Route path="/login" element={<AuthRoute component={<LogIn />} />} />
				<Route path="/signup" element={<AuthRoute component={<SignUp />} />} />
				<Route path="/forgot-password" element={<AuthRoute component={<ForgotPassword />} />} />
				<Route path="/reset-password" element={<AuthRoute component={<ResetPassword />} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

export default AppRouter
