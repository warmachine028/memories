import PostDetails from './components/PostDetails/PostDetails'
import Navbar from './components/Navbar/Navbar'
import FloatingNavbar from './components/Navbar/FloatingNavbar'
import Home from './components/Home'
import Auth from './components/Auth/Auth'
import UserDetails, { PublicProfile } from './components/User/Details'
import UserUpdate from './components/User/Update'
import SnackBar from './components/SnackBar'
import ScrollToTop from './components/ScrollToTop'
import ForgotPassword from './components/Auth/ForgotPassword'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { SnackbarProvider } from './contexts/SnackbarContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import { classes, Root } from './styles/styles'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { ModeProvider } from '../src/providers'
import { useMode } from '../src/hooks'
import { useSnackbar } from '../src/hooks'

const App = () => {
	const { mode } = useMode()
	const { snackBarProps } = useSnackbar()
	const { user } = useSelector((state) => state.authReducer)

	return (
		<ReduxProvider store={store}>
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
				<ModeProvider>
					<SnackbarProvider>
						<Root className={`${classes.rootLight} ${mode === 'light' ? classes.rootLight : classes.rootDark}`}>
							<div className={classes.blur}>
								<Navbar />
								<FloatingNavbar />
								<Routes>
									<Route path="/" element={<Navigate to="/posts" />} />
									<Route path="/posts" element={<Home user={user} />} />
									<Route path="/posts/search" element={<Home user={user} />} />
									<Route path="/posts/:id" element={<PostDetails user={user} />} />
									<Route path="/user" element={user ? <UserDetails user={user} /> : <Navigate to="/" />} />
									<Route path="/user/:id" element={<PublicProfile />} />
									<Route path="/user/update" element={user?.result.avatar ? <UserUpdate /> : <Navigate to="/" />} />
									<Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
									<Route path="/auth/forgotPassword" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
									<Route path="/auth/forgotPassword/:id/:token" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
								</Routes>
								<ScrollToTop />
								<SnackBar {...snackBarProps} />
							</div>
						</Root>
					</SnackbarProvider>
				</ModeProvider>
			</GoogleOAuthProvider>
		</ReduxProvider>
	)
}

export default App
