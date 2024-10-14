import { brand as logo } from '@/assets'
import { Avatar, IconButton, ListItemText, ListItemIcon, ListItemButton, ListItem, List, Divider, Button, SwipeableDrawer, Box } from '@mui/material'
import { Close, Dashboard, Logout, Settings } from '@mui/icons-material'

import ThemeSwitch from './ThemeSwitch'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'

const SideBar = ({ open, setOpen }) => {
	const closeDrawer = useCallback(() => setOpen(false), [setOpen])
	const { user } = useUser()
	const { signOut } = useAuth()

	return (
		<SwipeableDrawer open={open} onOpen={setOpen} onClose={closeDrawer} position="sticky">
			<Box role="presentation" maxWidth={500} sx={{ width: { xs: '100vw' } }} bgcolor="background.paper" minHeight="100vh">
				<Box display="flex" justifyContent="space-between" m={1} alignItems="center" top={0} zIndex={4} bgcolor="background.paper" position="sticky">
					<Button LinkComponent={Link} to="/" sx={{ ':hover': { bgcolor: 'transparent' } }}>
						<img src="favicon.ico" alt="logo" width={40} />
						<img src={logo} alt="logo" height={60} />
					</Button>
					<IconButton onClick={closeDrawer} sx={{ width: '50px', height: '50px' }}>
						<Close />
					</IconButton>
				</Box>
				{!user && (
					<>
						<List>
							<ListItem>
								<Button variant="contained" fullWidth LinkComponent={Link} to="/login" onClick={closeDrawer}>
									LOGIN
								</Button>
							</ListItem>
							<ListItem>
								<Button variant="outlined" fullWidth LinkComponent={Link} color="secondary" to="/signup" onClick={closeDrawer}>
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
								<Avatar src={user.imageUrl} />
							</ListItemIcon>
							<ListItemText primary={user.fullName} secondary={user.email} />
						</ListItem>
						<Divider />
						<ListItemButton LinkComponent={Link} to="/user" onClick={closeDrawer}>
							<ListItemText primary="Dashboard" />
							<ListItemIcon sx={{ minWidth: 0 }}>
								<Dashboard />
							</ListItemIcon>
						</ListItemButton>
						<ListItemButton LinkComponent={Link} to="/user/update" onClick={closeDrawer}>
							<ListItemText primary="Account Settings" />
							<ListItemIcon sx={{ minWidth: 0 }}>
								<Settings />
							</ListItemIcon>
						</ListItemButton>
						<ListItem>
							<ListItemText primary="Theme" />
							<ListItemIcon sx={{ minWidth: 0 }}>
								<ThemeSwitch />
							</ListItemIcon>
						</ListItem>
						<ListItemButton onClick={signOut}>
							<ListItemText primary="Log Out" />
							<ListItemIcon sx={{ minWidth: 0 }}>
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
							<ListItemIcon sx={{ minWidth: 0 }}>
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
