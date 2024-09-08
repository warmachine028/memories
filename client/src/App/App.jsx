import { useContext, useState } from 'react'
import PostDetails from '../components/PostDetails/PostDetails'
import Navbar from '../components/Navbar/Navbar'
import FloatingNavbar from '../components/Navbar/FloatingNavbar'
import Home from '../components/Home'
import Auth from '../components/Auth/Auth'
import UserDetails, { PublicProfile } from '../components/User/Details'
import UserUpdate from '../components/User/Update'
import SnackBar from '../components/SnackBar'
import ScrollToTop from '../components/ScrollToTop'
import ForgotPassword from '../components/Auth/ForgotPassword'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { SnackbarContext } from '../contexts/SnackbarContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { classes, Root } from './styles'
import { ModeContext, modes } from '../contexts/ModeContext'

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const { snackBarProps } = useContext(SnackbarContext)

  const [mode, setMode] = useState(modes.light)

  // FUNCTION TO TOGGLE THEMES ON CLICK

  const modeToggle = () => {
    mode === modes.light ? setMode(modes.dark) : setMode(modes.light)
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ModeContext.Provider value={{ mode, modeToggle }}>
          <Root className={`${classes.rootLight} ${mode === 'light' ? classes.rootLight : classes.rootDark}`}>
            <div className={classes.blur}>
              <Navbar user={user} setUser={setUser} />
              <FloatingNavbar user={user} setUser={setUser} />
              <Routes>
                <Route path='/' element={<Navigate to='/posts' />} />
                <Route path='/posts' element={<Home user={user} />} />
                <Route path='/posts/search' element={<Home user={user} />} />
                <Route path='/posts/:id' element={<PostDetails user={user} />} />
                <Route path='/user' element={user ? <UserDetails user={user} /> : <Navigate to='/' />} />
                <Route path='/user/:id' element={<PublicProfile />} />
                <Route path='/user/update' element={user?.result.avatar ? <UserUpdate user={user} setUser={setUser} /> : <Navigate to='/' />} />
                <Route path='/auth' element={user ? <Navigate to='/' /> : <Auth />} />
                <Route path='/auth/forgotPassword' element={user ? <Navigate to='/' /> : <ForgotPassword />} />
                <Route path='/auth/forgotPassword/:id/:token' element={user ? <Navigate to='/' /> : <ForgotPassword />} />
              </Routes>
              <ScrollToTop />
              <SnackBar {...snackBarProps} />
            </div>
          </Root>
        </ModeContext.Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
