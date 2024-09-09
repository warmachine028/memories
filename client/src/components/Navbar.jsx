import { useState } from 'react'
import { AppBar, Box, Toolbar, IconButton, Container, Button, ButtonGroup } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AccountMenu from './AccountMenu'
import ThemeSwitch from './ThemeSwitch'
import brand from '../images/memories.png'
import SideBar from './Sidebar'
import { Searchbar } from '.'

const Navbar = () => {
	const [open, setOpen] = useState(false)

	const location = useLocation()
	const inAuth = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname)
	const inHome = location.pathname === '/post'
	const { user } = useSelector((state) => state.authReducer)
	// const user = {}
	return (
		<AppBar position="sticky">
			<Container maxWidth="xl" sx={{ bgcolor: 'transparent', pb: { xs: 2, md: 0 } }}>
				<Toolbar disableGutters sx={{ display: 'flex', justifyContent: { md: 'space-between' } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={setOpen}
						color="inherit"
						sx={{
							width: '50px',
							height: '50px',
							display: { xs: 'block', md: 'none' },
							marginRight: 2
						}}
					>
						<MenuIcon />
					</IconButton>
					<Branding />
					{!user && !inAuth && <LoggedOutOptions />}
					{user && <AccountMenu />}
				</Toolbar>
				{inHome && <Searchbar />}
				<SideBar open={open} setOpen={setOpen} />
			</Container>
		</AppBar>
	)
}

const Branding = () => (
	<Box display="flex" justifyContent="center" alignItems="center">
		<Box component={Link} to="/" alignItems="center" justifyContent="center" display="flex" gap={1}>
			<img src="favicon.ico" width="40" alt="logo" />
			<img src={brand} alt="brand" width={200} />
		</Box>
	</Box>
)

const LoggedOutOptions = () => (
	<ButtonGroup
		sx={{
			display: { xs: 'none', md: 'flex' }
		}}
	>
		<ThemeSwitch />
		<Button variant="contained" color="secondary" href="/login">
			LOGIN
		</Button>
	</ButtonGroup>
)
export default Navbar
