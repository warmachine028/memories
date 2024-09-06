import { Computer, DarkMode, LightMode, SettingsSystemDaydream } from '@mui/icons-material'
import { Button, ButtonGroup, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '../hooks'

const ThemeSwitch = () => {
	const [open, setOpen] = useState(false)
	const { switchTheme, Themes, mode } = useTheme()
	const handleClose = () => setOpen(false)
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
		setOpen(!open)
	}

	return (
		<>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				variant="contained"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={{
					display: {
						xs: 'none',
						md: 'block',
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
					<MenuItem onClick={() => switchTheme(Themes.LIGHT)} selected={mode === Themes.LIGHT}>
						<Button variant="text" endIcon={<LightMode />}>
							Light
						</Button>
					</MenuItem>
					<MenuItem onClick={() => switchTheme(Themes.DARK)} selected={mode === Themes.DARK}>
						<Button variant="text" endIcon={<DarkMode />}>
							Dark
						</Button>
					</MenuItem>
					<MenuItem onClick={() => switchTheme(Themes.SYSTEM)} selected={mode === Themes.SYSTEM}>
						<Button variant="text" endIcon={<SettingsSystemDaydream />}>
							System
						</Button>
					</MenuItem>
				</Menu>
			</Button>
			<ButtonGroup
				sx={{
					display: { md: 'none' },
				}}
			>
				<Button variant={mode === Themes.LIGHT ? 'contained' : 'outlined'} onClick={() => switchTheme(Themes.LIGHT)}>
					<LightMode />
				</Button>
				<Button variant={mode === Themes.DARK ? 'contained' : 'outlined'} onClick={() => switchTheme(Themes.DARK)}>
					<DarkMode />
				</Button>
				<Button variant={mode === Themes.SYSTEM ? 'contained' : 'outlined'} onClick={() => switchTheme(Themes.SYSTEM)}>
					<Computer />
				</Button>
			</ButtonGroup>
		</>
	)
}

export default ThemeSwitch
