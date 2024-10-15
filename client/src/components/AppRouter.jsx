import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
const { Posts, LogIn, NotFound, SignUp, VerifyEmail, Profile, Playground, Post } = {
	Posts: lazy(() => import('@/pages/Posts')),
	LogIn: lazy(() => import('@/pages/LogIn')),
	NotFound: lazy(() => import('@/pages/NotFound')),
	SignUp: lazy(() => import('@/pages/SignUp')),
	VerifyEmail: lazy(() => import('@/pages/VerifyEmail')),
	Profile: lazy(() => import('@/pages/Profile')),
	Playground: lazy(() => import('@/pages/Playground')),
	Post: lazy(() => import('@/pages/Post')),
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
				<Route path="/user/:id" element={<Profile />} />
				<Route path="/login" element={<AuthRoute component={<LogIn />} />} />
				<Route path="/signup" element={<AuthRoute component={<SignUp />} />} />
				<Route path="/verify-email" element={<AuthRoute component={<VerifyEmail />} />} />
				<Route path="/callback" element={<AuthRoute component={<AuthenticateWithRedirectCallback />} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

export default AppRouter
