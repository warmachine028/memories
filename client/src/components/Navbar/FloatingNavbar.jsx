import { AppBar } from '@mui/material'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'

const FloatingNavbar = ({ user, setUser }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Button is displayed after scrolling for 200 pixels
    const toggleVisibility = () => setIsVisible(window.scrollY > 130)
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])
  return (
    <AppBar
      style={{
			  backgroundColor: 'transparent',
			  display: isVisible ? 'block' : 'none',
			  boxShadow: 'none',
			  padding: 5
      }}
    >
      <Navbar user={user} setUser={setUser} floating />
    </AppBar>
  )
}

export default FloatingNavbar
