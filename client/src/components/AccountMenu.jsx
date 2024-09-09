import { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { PersonAdd, Settings, ChevronRight, Computer, DarkMode, Done, LightMode, Logout } from '@mui/icons-material'
import { useTheme } from '@/hooks'
import { Link } from 'react-router-dom'
import { logOut } from '@/reducers/auth'
import { useDispatch } from 'react-redux'

const AccountIcon = ({ handleClick, open }) => (
	<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
		<Tooltip title="Account settings" arrow>
			<IconButton onClick={handleClick} size="large" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
				<Avatar sx={{ width: 40, height: 40, ':hover': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 3 } }} src="https://mui.com/static/images/avatar/3.jpg">
					M
				</Avatar>
			</IconButton>
		</Tooltip>
	</Box>
)

const AccountMenuItems = ({ handleClose, handleClick, open }) => {
	const dispatch = useDispatch()

	const handleLogout = useCallback(
		(event) => {
			event.preventDefault()
			dispatch(logOut())
		},
		[dispatch]
	)
	return (
		<>
			<MenuItem component={Link} to="/user" onClick={handleClose}>
				<Avatar src="https://mui.com/static/images/avatar/3.jpg" /> Profile
			</MenuItem>
			<Divider />
			<MenuItem onClick={handleClose}>
				<ListItemIcon>
					<PersonAdd fontSize="small" />
				</ListItemIcon>
				Add another account
			</MenuItem>
			<MenuItem component={Link} to="/user/update" onClick={handleClose}>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>
				Settings
			</MenuItem>
			<MenuItem
				aria-controls={open ? 'account-menu' : undefined}
				onClick={handleClick}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<ListItemIcon>
						<Computer fontSize="small" />
					</ListItemIcon>
					Theme
				</div>
				<ListItemIcon>
					<ChevronRight fontSize="small" />
				</ListItemIcon>
			</MenuItem>
			<MenuItem onClick={handleLogout}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Logout
			</MenuItem>
		</>
	)
}

const ThemeMenu = ({ handleClose, anchorEl, open }) => {
	const { switchTheme, Themes, mode } = useTheme()

	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			sx={{ left: -10, top: 10, marginRight: 0 }}
			slotProps={{
				paper: {
					elevation: 0,
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
			<MenuItem onClick={() => switchTheme(Themes.LIGHT)} selected={mode === Themes.LIGHT}>
				<ListItemIcon>
					<LightMode fontSize="small" />
				</ListItemIcon>
				Light
				{mode === Themes.LIGHT && (
					<ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
						<Done fontSize="small" />
					</ListItemIcon>
				)}
			</MenuItem>
			<MenuItem onClick={() => switchTheme(Themes.DARK)} selected={mode === Themes.DARK}>
				<ListItemIcon>
					<DarkMode fontSize="small" />
				</ListItemIcon>
				Dark
				{mode === Themes.DARK && (
					<ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
						<Done fontSize="small" />
					</ListItemIcon>
				)}
			</MenuItem>
			<MenuItem onClick={() => switchTheme(Themes.SYSTEM)} selected={mode === Themes.SYSTEM}>
				<ListItemIcon>
					<Computer fontSize="small" />
				</ListItemIcon>
				System
				{mode === Themes.SYSTEM && (
					<ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
						<Done fontSize="small" />
					</ListItemIcon>
				)}
			</MenuItem>
		</Menu>
	)
}

const AccountMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = useCallback((event) => {
		setAnchorEl(event.currentTarget)
	}, [])
	const handleClose = useCallback(() => {
		setAnchorEl(null)
	}, [])
	const [anchorEl2, setAnchorEl2] = useState(null)
	const handleClickTheme = useCallback((event) => {
		setAnchorEl2(event.currentTarget)
	}, [])
	const handleCloseTheme = useCallback(() => {
		setAnchorEl2(null)
	}, [])
	return (
		<>
			<AccountIcon handleClick={handleClick} open={open} />
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				// onClick={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0
							}
						}
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<AccountMenuItems handleClose={handleClose} handleClick={handleClickTheme} open={Boolean(anchorEl2)} />
			</Menu>
			<ThemeMenu anchorEl={anchorEl2} handleClose={handleCloseTheme} open={Boolean(anchorEl2)} />
		</>
	)
}
export default AccountMenu
