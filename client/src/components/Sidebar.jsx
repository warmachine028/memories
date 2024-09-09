import logo from '../images/memories.png'
import { Avatar, IconButton, ListItemText, ListItemIcon, ListItemButton, ListItem, List, Divider, Button, Drawer, Box } from '@mui/material'
import { Close, Dashboard, Logout, Settings } from '@mui/icons-material'
import ThemeSwitch from './ThemeSwitch'
import { useSelector } from 'react-redux'

const SideBar = ({ open, setOpen }) => {
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen)
	}
	const { user } = useSelector((state) => state.authReducer)

	return (
		<Drawer open={open} onClose={toggleDrawer(false)}>
			<Box
				role="presentation"
				maxWidth="500px"
				sx={{
					width: {
						xs: '100vw'
					}
				}}
			>
				<Box
					position="sticky"
					sx={{
						w: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						bgcolor: 'transparent',
						m: 1,
						alignItems: 'center'
					}}
				>
					<Button
						href="/"
						sx={{
							':hover': {
								backgroundColor: 'transparent'
							}
						}}
					>
						<img src="favicon.ico" alt="logo" width={40} />
						<img src={logo} alt="logo" height={60} />
					</Button>
					<IconButton
						onClick={toggleDrawer(false)}
						sx={{
							width: '50px',
							height: '50px'
						}}
					>
						<Close />
					</IconButton>
				</Box>
				{!user && (
					<>
						<List>
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
					<List sx={{ p: 1, height: '100vh' }}>
						<ListItem>
							<ListItemIcon>
								<Avatar src={user.image} />
							</ListItemIcon>
							<ListItemText primary={user.name} secondary={user.email} />
						</ListItem>
						<ListItemButton href="/user">
							<ListItemText primary="Dashboard" />
							<ListItemIcon sx={{ minWidth: '0px' }}>
								<Dashboard />
							</ListItemIcon>
						</ListItemButton>
						<ListItemButton href="/user/update">
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
						<ListItemButton>
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
