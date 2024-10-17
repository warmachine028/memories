import { AppBar, Box, Toolbar, IconButton, Container, Button, ButtonGroup, Stack } from '@mui/material'
import { AccountMenu, ThemeSwitch, Sidebar, Searchbar } from '@/components'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Menu } from '@mui/icons-material'
import { brand } from '@/assets'

const Branding = () => {
	return (
		<Stack justifyContent="center" alignItems="center" position={{ xs: 'absolute', md: 'revert' }} left="50%" right="50%">
			<Box component={Link} to="/" alignItems="center" justifyContent="center" display="flex" gap={1}>
				<Box component="img" src="favicon.ico" width={40} alt="logo" />
				<Box component="img" src={brand} width={200} alt="brand" />
			</Box>
		</Stack>
	)
}

const LoggedOutOptions = () => {
	const { pathname } = useLocation()
	const { isLoaded, isSignedIn } = useAuth()
	const inAuth = ['/login', '/signup', '/verify-email'].includes(pathname)

	if (!isLoaded || inAuth || isSignedIn) {
		return null
	}

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
	const handleOpen = () => setOpen(true)

	return (
		<AppBar position="sticky">
			<Container maxWidth="xl" sx={{ pb: { xs: 2, md: 0 } }}>
				<Sidebar open={open} setOpen={setOpen} />
				<ToolbarContent handleOpen={handleOpen} />
				<Searchbar />
			</Container>
		</AppBar>
	)
}

const ToolbarContent = ({ handleOpen }) => (
	<Toolbar disableGutters>
		<Stack py={2} justifyContent="space-between" direction="row" width="100%" alignItems="center">
			<IconButton size="large" aria-label="current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpen} edge="start" color="inherit" sx={{ width: '50px', height: '50px', display: { xs: 'block', md: 'none' }, marginRight: 2 }}>
				<Menu />
			</IconButton>
			<Branding />
			<LoggedOutOptions />
			<AccountMenu />
		</Stack>
	</Toolbar>
)

export default Navbar
