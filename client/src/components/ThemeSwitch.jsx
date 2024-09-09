import { Computer, DarkMode, LightMode, SettingsSystemDaydream } from '@mui/icons-material'
import { Button, ButtonGroup, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTheme } from '../hooks'

const ThemeSwitch = () => {
	const [open, setOpen] = useState(false)
	const { switchTheme, Themes, mode } = useTheme()
	const handleClose = useCallback(() => setOpen(false), [])
	const [anchorEl, setAnchorEl] = useState(null)

	const handleOpen = useCallback(
		(event) => {
			setAnchorEl(event.currentTarget)
			setOpen(!open)
		},
		[open]
	)
	const handleClick = useCallback(
		(event) => {
			switchTheme(event.currentTarget.textContent.toUpperCase())
		},
		[switchTheme]
	)

	return (
		<>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				variant="contained"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleOpen}
				sx={{
					display: {
						xs: 'none',
						md: 'block'
					}
				}}
			>
				Switch Theme
				{open && <ThemeMenu anchorEl={anchorEl} handleClose={handleClose} switchTheme={switchTheme} mode={mode} Themes={Themes} />}
			</Button>
			<ButtonGroup
				sx={{
					display: { md: 'none' }
				}}
			>
				<Button variant={mode === Themes.LIGHT ? 'contained' : 'outlined'} onClick={handleClick}>
					<LightMode />
				</Button>
				<Button variant={mode === Themes.DARK ? 'contained' : 'outlined'} onClick={handleClick}>
					<DarkMode />
				</Button>
				<Button variant={mode === Themes.SYSTEM ? 'contained' : 'outlined'} onClick={handleClick}>
					<Computer />
				</Button>
			</ButtonGroup>
		</>
	)
}

const ThemeMenu = ({ anchorEl, handleClose, handleClick, mode, Themes }) => {
	return (
		<Menu
			id="basic-menu"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleClose}
			MenuListProps={{
				'aria-labelledby': 'basic-button'
			}}
		>
			<MenuItem onClick={handleClick} selected={mode === Themes.LIGHT}>
				<ListItemText sx={{ mr: 1 }}>Light</ListItemText>
				<ListItemIcon>
					<LightMode />
				</ListItemIcon>
			</MenuItem>
			<MenuItem onClick={handleClick} selected={mode === Themes.DARK}>
				<ListItemText sx={{ mr: 1 }}>Dark</ListItemText>
				<ListItemIcon>
					<DarkMode />
				</ListItemIcon>
			</MenuItem>
			<MenuItem onClick={handleClick} selected={mode === Themes.SYSTEM}>
				<ListItemText sx={{ mr: 1 }}>System</ListItemText>
				<ListItemIcon>
					<SettingsSystemDaydream />
				</ListItemIcon>
			</MenuItem>
		</Menu>
	)
}

export default ThemeSwitch
