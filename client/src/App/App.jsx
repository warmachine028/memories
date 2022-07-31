import { useState } from 'react'
import PostDetails from '../components/PostDetails/PostDetails'
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home'
import Auth from '../components/Auth/Auth'
import UserDetails from '../components/User/Details'
import UserUpdate from '../components/User/Update'
import SnackBar from '../components/SnackBar'
import ForgotPassword from '../components/Auth/ForgotPassword'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { classes, Root } from './styles'
// import user_ from "../temp"

const App = () => {
	// const [user, setUser] = useState(user_)
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
	const [snackBarMessage, setSnackBarMessage] = useState('')
	const [alertSeverity, setAlertSeverity] = useState('success')
	const [open, setOpen] = useState(false)

	const openSnackBar = (severity, message) => {
		setAlertSeverity(severity)
		setSnackBarMessage(message)
		setOpen(true)
	}
	const snackBarprops = { open, setOpen, alertSeverity, snackBarMessage }
	return (
		<BrowserRouter>
			<Root className={classes.root}>
				<div className={classes.blur}>
					<Navbar user={user} setUser={setUser} snackBar={openSnackBar} />
					<Routes>
						<Route path="/" element={<Navigate to="/posts" snackBar={openSnackBar} />} />
						<Route path="/posts" element={<Home user={user} snackBar={openSnackBar} />} />
						<Route path="/posts/search" element={<Home user={user} snackBar={openSnackBar} />} />
						<Route path="/posts/:id" element={<PostDetails user={user} snackBar={openSnackBar} />} />
						<Route path="/user" element={user ? <UserDetails user={user} /> : <Navigate to="/" />} />
						<Route path="/user/update" element={user ? <UserUpdate user={user} setUser={setUser} snackBar={openSnackBar} /> : <Navigate to="/" />} />
						<Route path="/auth" element={user ? <Navigate to="/" /> : <Auth snackBar={openSnackBar} />} />
						<Route path="/auth/forgotPassword" element={user ? <Navigate to="/" /> : <ForgotPassword snackBar={openSnackBar} />} />
						<Route path="/auth/forgotPassword/:id/:token" element={user ? <Navigate to="/" /> : <ForgotPassword snackBar={openSnackBar} />} />
					</Routes>
					<SnackBar {...snackBarprops} />
				</div>
			</Root>
		</BrowserRouter>
	)
}

export default App
