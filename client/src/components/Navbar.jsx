import { useState } from 'react'
import { AppBar, Box, Toolbar, IconButton, Container, Button, ButtonGroup } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AccountMenu from './AccountMenu'
import ThemeSwitch from './ThemeSwitch'
import logo from '../images/memories.png'
import SideBar from './Sidebar'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const location = useLocation()
  const inAuth = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname)
  const { user } = useSelector((state) => state.authReducer)
  // const user = {}
  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl' sx={{ bgcolor: 'transparent' }}>
        <Toolbar disableGutters>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={setOpen}
            color='inherit'
            sx={{
						  width: '50px',
						  height: '50px',
						  display: { xs: 'block', md: 'none' },
						  marginRight: 2
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
						  display: 'flex',
						  justifyContent: 'center',
						  alignItems: 'center',
						  width: { xs: 'calc(100% - 100px)', sm: 'auto' }
            }}
          >
            <Link
              to='/'
              style={{
							  textDecoration: 'none',
							  display: 'flex',
							  justifyItems: 'center',
							  alignItems: 'center',
							  gap: 10
              }}
            >
              <Container
                sx={{
								  p: 0,
								  display: {
								    xs: 'none',
								    sm: 'block'
                  },
								  bgcolor: 'transparent'
                }}
              >
                <img src='favicon.ico' width='40' />
              </Container>
              <img src={logo} alt='logo' width={200} />
            </Link>
          </Box>

          {!user && !inAuth && (
            <ButtonGroup
              sx={{
							  display: { xs: 'none', md: 'flex' }
              }}
            >
              <ThemeSwitch />
              <Button variant='contained' color='secondary' href='/login'>
                LOGIN
              </Button>
            </ButtonGroup>
          )}

          {user && <AccountMenu />}
        </Toolbar>
        <SideBar open={open} setOpen={setOpen} />
      </Container>
    </AppBar>
  )
}
export default Navbar
