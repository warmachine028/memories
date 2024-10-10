import logo from '@/assets/memories.png'
import { Avatar, IconButton, ListItemText, ListItemIcon, ListItemButton, ListItem, List, Divider, Button, SwipeableDrawer, Box } from '@mui/material'
import { Close, Dashboard, Logout, Settings } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '@/actions/auth'
import ThemeSwitch from './ThemeSwitch'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

const SideBar = ({ open, setOpen }) => {
	const closeDrawer = useCallback(() => setOpen(false), [setOpen])

	const { user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	const handleLogout = useCallback(
		(event) => {
			event.preventDefault()
			dispatch(logOut())
		},
		[dispatch]
	)

	return (
		<SwipeableDrawer open={open} onOpen={() => { }} onClose={closeDrawer} position="sticky">
			<Box role="presentation" maxWidth="500px" sx={{ width: { xs: '100vw' } }} bgcolor="background.paper">
				<Box display="flex" justifyContent="space-between" m={1} alignItems="center" top={0} zIndex={4} bgcolor="background.paper" position="sticky">
					<Button LinkComponent={Link} to="/" sx={{ ':hover': { backgroundColor: 'transparent' } }}>
						<img src="favicon.ico" alt="logo" width={40} />
						<img src={logo} alt="logo" height={60} />
					</Button>
					<IconButton onClick={closeDrawer} sx={{ width: '50px', height: '50px' }}>
						<Close />
					</IconButton>
				</Box>
				{!user && (
					<>
						<List sx={{ height: '70vh' }}>
							<ListItem>
								<Button variant="contained" fullWidth LinkComponent={Link} to="/login">
									LOGIN
								</Button>
							</ListItem>
							<ListItem>
								<Button variant="outlined" fullWidth LinkComponent={Link} color="secondary" to="/signup">
									SIGN UP
								</Button>
							</ListItem>
						</List>
						<Divider />
					</>
				)}
				{user && (
					<List sx={{ p: 1, height: '100vh', zIndex: 1 }}>
						<ListItem>
							<ListItemIcon>
								<Avatar src={user.image} />
							</ListItemIcon>
							<ListItemText primary={user.name} secondary={user.email} />
						</ListItem>
						<Divider />
						<ListItemButton LinkComponent={Link} to="/user" onClick={closeDrawer}>
							<ListItemText primary="Dashboard" />
							<ListItemIcon sx={{ minWidth: '0px' }}>
								<Dashboard />
							</ListItemIcon>
						</ListItemButton>
						<ListItemButton LinkComponent={Link} to="/user/update" onClick={closeDrawer}>
							<ListItemText primary="Account Settings" />
							<ListItemIcon sx={{ minWidth: '0px' }}>
								<Settings />
							</ListItemIcon>
						</ListItemButton>
						<ListItem>
							<ListItemText primary="Theme" />
							<ListItemIcon sx={{ minWidth: '0px' }}>
								<ThemeSwitch />
							</ListItemIcon>
						</ListItem>
						<ListItemButton onClick={handleLogout}>
							<ListItemText primary="Log Out" />
							<ListItemIcon sx={{ minWidth: '0px' }}>
								<Logout />
							</ListItemIcon>
						</ListItemButton>
					</List>
				)}
				<Divider />
				{!user && (
					<List>
						<ListItem>
							<ListItemText primary="Theme" />
							<ListItemIcon sx={{ minWidth: '0px' }}>
								<ThemeSwitch />
							</ListItemIcon>
						</ListItem>
					</List>
				)}
			</Box>
		</SwipeableDrawer>
	)
}

export default SideBar
