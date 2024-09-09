import logo from '../images/memories.png'
import { Avatar, IconButton, ListItemText, ListItemIcon, ListItemButton, ListItem, List, Divider, Button, Drawer, Box } from '@mui/material'
import { Close, Dashboard, Logout, Settings } from '@mui/icons-material'
import ThemeSwitch from './ThemeSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { logOut } from '@/reducers/auth'

const SideBar = ({ open, setOpen }) => {
	const closeDrawer = useCallback(() => setOpen(false), [setOpen])

	const { user } = useSelector((state) => state.authReducer)
	const dispatch = useDispatch()

	const handleLogout = useCallback(
		(event) => {
			event.preventDefault()
			dispatch(logOut())
		},
		[dispatch]
	)

	return (
		<Drawer open={open} onClose={closeDrawer} position="sticky">
			<Box role="presentation" maxWidth="500px" sx={{ width: { xs: '100vw' } }} bgcolor="background.paper">
				<Box
					sx={{
						w: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						m: 1,
						alignItems: 'center',
						top: 0,
						zIndex: 4
					}}
					position="sticky"
					bgcolor="background.paper"
				>
					<Button href="/" sx={{ ':hover': { backgroundColor: 'transparent' } }}>
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
								<Button variant="contained" fullWidth href="/login">
									LOGIN
								</Button>
							</ListItem>
							<ListItem>
								<Button variant="outlined" fullWidth color="secondary" href="/signup">
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
		</Drawer>
	)
}

export default SideBar
