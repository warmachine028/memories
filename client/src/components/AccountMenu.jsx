import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, CircularProgress } from '@mui/material'
import { Settings, ChevronRight, Computer, DarkMode, Done, LightMode, Logout } from '@mui/icons-material'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks'
import { useState } from 'react'
import { UserAvatar } from '.'

const AccountMenuItems = ({ handleClose, handleClick, open }) => {
	const { user } = useUser()
	const { signOut } = useAuth()

	return (
		<>
			<MenuItem component={Link} to="/user" onClick={handleClose}>
				<Avatar src={user.imageUrl} /> {user.fullName}
			</MenuItem>
			<Divider />

			<MenuItem component={Link} to="/user/update" onClick={handleClose}>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>
				Settings
			</MenuItem>
			<MenuItem aria-controls={open ? 'theme-menu' : undefined} onClick={handleClick} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Box display="flex" alignItems="center">
					<ListItemIcon>
						<Computer fontSize="small" />
					</ListItemIcon>
					Theme
				</Box>
				<ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
					<ChevronRight fontSize="small" />
				</ListItemIcon>
			</MenuItem>
			<MenuItem onClick={signOut}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Logout
			</MenuItem>
		</>
	)
}

const ThemeMenu = ({ handleClose, anchorEl, open }) => {
	const { theme, setTheme } = useTheme()
	const handleClick = (newTheme) => setTheme(newTheme)

	return (
		<Menu
			anchorEl={anchorEl}
			id="theme-menu"
			open={open}
			onClose={handleClose}
			sx={{ left: -10, top: 10, marginRight: 0 }}
			slotProps={{
				paper: {
					elevation: 1,
					sx: {
						minWidth: 160,
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							mr: 1
						},
						'&::before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 16,
							right: -5,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0
						}
					}
				}
			}}
			anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
		>
			<MenuItem onClick={() => handleClick('light')}>
				<ListItemIcon>
					<LightMode fontSize="small" />
				</ListItemIcon>
				Light
				{theme === 'light' && (
					<ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
						<Done fontSize="small" />
					</ListItemIcon>
				)}
			</MenuItem>
			<MenuItem onClick={() => handleClick('dark')}>
				<ListItemIcon>
					<DarkMode fontSize="small" />
				</ListItemIcon>
				Dark
				{theme === 'dark' && (
					<ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
						<Done fontSize="small" />
					</ListItemIcon>
				)}
			</MenuItem>
			<MenuItem onClick={() => handleClick('system')}>
				<ListItemIcon>
					<Computer fontSize="small" />
				</ListItemIcon>
				System
				{theme === 'system' && (
					<ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
						<Done fontSize="small" />
					</ListItemIcon>
				)}
			</MenuItem>
		</Menu>
	)
}

const AccountMenu = () => {
	const { isLoaded, isSignedIn } = useUser()
	const [anchorEl2, setAnchorEl2] = useState(null)
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)
	const handleClickTheme = (event) => setAnchorEl2(event.currentTarget)
	const { user } = useUser()

	const handleCloseTheme = () => setAnchorEl2(null)
	if (!isLoaded) {
		return <CircularProgress size={45} />
	}
	if (!isSignedIn) {
		return null
	}
	return (
		<>
			<UserAvatar handleClick={handleClick} open={open} user={user} />
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						elevation: 1,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								mr: 1
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 28,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0
							}
						}
					}
				}}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			>
				<AccountMenuItems handleClose={handleClose} handleClick={handleClickTheme} open={Boolean(anchorEl2)} />
			</Menu>
			<ThemeMenu anchorEl={anchorEl2} handleClose={handleCloseTheme} open={Boolean(anchorEl2)} />
		</>
	)
}
export default AccountMenu
