import { useCallback, useState } from 'react'
import { AppBar, Box, Toolbar, IconButton, Container, Button, ButtonGroup } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AccountMenu, ThemeSwitch, Sidebar, Searchbar } from '@/components'
import brand from '@/assets/memories.png'

const Branding = () => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center" position={{ xs: 'absolute', md: 'revert' }} left="50%" right="50%">
			<Box component={Link} to="/" alignItems="center" justifyContent="center" display="flex" gap={1}>
				<img src="favicon.ico" width="40" alt="logo" />
				<img src={brand} alt="brand" width={200} />
			</Box>
		</Box>
	)
}

const LoggedOutOptions = () => {
	return (
		<ButtonGroup sx={{ display: { xs: 'none', md: 'flex' } }}>
			<ThemeSwitch />
			<Button LinkComponent={Link} variant="contained" color="secondary" to="/login">
				LOGIN
			</Button>
		</ButtonGroup>
	)
}

const Navbar = () => {
	const [open, setOpen] = useState(false)
	const openDrawer = useCallback(() => setOpen(true), [])
	const location = useLocation()
	const inAuth = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname)
	const inHome = location.pathname === '/posts'
	const { user } = useSelector((state) => state.auth)
	// const user = {}
	return (
		<AppBar position="sticky">
			<Container maxWidth="xl" sx={{ pb: { xs: 2, md: 0 } }}>
				<Sidebar open={open} setOpen={setOpen} />
				<Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', py: 2 }}>
					<IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={openDrawer} edge="start" color="inherit" sx={{ width: '50px', height: '50px', display: { xs: 'block', md: 'none' }, marginRight: 2 }}>
						<Menu />
					</IconButton>
					<Branding />
					{!user && !inAuth && <LoggedOutOptions />}
					{user && <AccountMenu />}
				</Toolbar>
				<Searchbar />
			</Container>
		</AppBar>
	)
}

export default Navbar
