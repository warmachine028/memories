import { Computer, DarkMode, LightMode, SettingsSystemDaydream } from '@mui/icons-material'
import { Button, ButtonGroup, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTheme } from '@/hooks'

const ThemeMenu = ({ anchorEl, handleClose, handleClick, theme }) => {
	return (
		<Menu
			id="theme-menu"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleClose}
			MenuListProps={{
				'aria-labelledby': 'theme-button'
			}}
		>
			<MenuItem onClick={() => handleClick('light')} selected={theme === 'light'}>
				<ListItemText sx={{ mr: 1 }}>Light</ListItemText>
				<ListItemIcon>
					<LightMode />
				</ListItemIcon>
			</MenuItem>
			<MenuItem onClick={() => handleClick('dark')} selected={theme === 'dark'}>
				<ListItemText sx={{ mr: 1 }}>Dark</ListItemText>
				<ListItemIcon>
					<DarkMode />
				</ListItemIcon>
			</MenuItem>
			<MenuItem onClick={() => handleClick('system')} selected={theme === 'system'}>
				<ListItemText sx={{ mr: 1 }}>System</ListItemText>
				<ListItemIcon>
					<SettingsSystemDaydream />
				</ListItemIcon>
			</MenuItem>
		</Menu>
	)
}
const ThemeSwitch = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const { theme, setTheme } = useTheme()

	const handleOpen = useCallback((event) => {
		setAnchorEl(event.currentTarget)
	}, [])

	const handleClose = useCallback(() => {
		setAnchorEl(null)
	}, [])

	const handleClick = useCallback(
		(newTheme) => {
			setTheme(newTheme)
			handleClose()
		},
		[setTheme, handleClose]
	)

	return (
		<>
			<Button //
				id="theme-button"
				aria-controls={anchorEl ? 'theme-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={anchorEl ? 'true' : undefined}
				variant="contained"
				onClick={handleOpen}
				sx={{
					display: {
						xs: 'none',
						md: 'block'
					}
				}}
			>
				Switch Theme
			</Button>
			<ThemeMenu //
				anchorEl={anchorEl}
				handleClose={handleClose}
				handleClick={handleClick}
				theme={theme}
			/>
			<ButtonGroup
				sx={{
					display: { md: 'none' }
				}}
			>
				<Button variant={theme === 'light' ? 'contained' : 'outlined'} onClick={() => handleClick('light')}>
					<LightMode />
				</Button>
				<Button variant={theme === 'dark' ? 'contained' : 'outlined'} onClick={() => handleClick('dark')}>
					<DarkMode />
				</Button>
				<Button variant={theme === 'system' ? 'contained' : 'outlined'} onClick={() => handleClick('system')}>
					<Computer />
				</Button>
			</ButtonGroup>
		</>
	)
}
export default ThemeSwitch
