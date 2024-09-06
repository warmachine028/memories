import { DarkMode, LightMode, Nightlight, Palette as PaletteIcon, SettingsSystemDaydream } from '@mui/icons-material'
import { Button, Menu, MenuItem, Paper } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '../hooks'

const ThemeSwitch = () => {
	const [open, setOpen] = useState(false)
	const { theme, switchTheme, Themes } = useTheme()
	const handleClose = () => setOpen(false)
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
		setOpen(!open)
	}

	const setTheme = (theme) => {
		switchTheme(theme)
		handleClose()
	}
	return (
		<Button
			id="basic-button"
			aria-controls={open ? 'basic-menu' : undefined}
			variant="contained"
			aria-haspopup="true"
			aria-expanded={open ? 'true' : undefined}
			onClick={handleClick}
			sx={{
				width: {
					xs: '100%',
					md: 'auto',
				},
			}}
		>
			Switch Theme
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={() => setTheme(Themes.LIGHT)} selected={theme === Themes.LIGHT}>
					<Button variant="text" endIcon={<LightMode />}>
						Light
					</Button>
				</MenuItem>
				<MenuItem onClick={() => setTheme(Themes.DARK)} selected={theme === Themes.DARK}>
					<Button variant="text" endIcon={<DarkMode />}>
						Dark
					</Button>
				</MenuItem>
				<MenuItem onClick={() => setTheme(Themes.SYSTEM)} selected={theme === Themes.SYSTEM}>
					<Button variant="text" endIcon={<SettingsSystemDaydream />}>
						System
					</Button>
				</MenuItem>
			</Menu>
		</Button>
	)
}

export default ThemeSwitch
