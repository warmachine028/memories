import { useState } from 'react'
import PostDetails from '../components/PostDetails/PostDetails'
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home'
import Auth from '../components/Auth/Auth'
import UserDetails from '../components/User/Details'
import UserUpdate from '../components/User/Update'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { classes, Root } from './styles'
// import user_ from "../temp"

const App = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
	// const [user, setUser] = useState(user_)
	return (
		<BrowserRouter>
			<Root className={classes.root}>
				<div className={classes.blur}>
					<Navbar user={user} setUser={setUser} />
					<Routes>
						<Route path="/" element={<Navigate to="/posts" />} />
						<Route path="/posts" element={<Home user={user} />} />
						<Route path="/posts/search" element={<Home user={user} />} />
						<Route path="/posts/:id" element={<PostDetails user={user} />} />
						<Route path="/auth" element={user ? <Navigate to="/posts" /> : <Auth />} />
						<Route path="/user" element={user ? <UserDetails user={user} /> : <Navigate to="/" />} />
						<Route path="/user/update" element={user ? <UserUpdate user={user} setUser={setUser} /> : <Navigate to="/" />} />
					</Routes>
				</div>
			</Root>
		</BrowserRouter>
	)
}

export default App
