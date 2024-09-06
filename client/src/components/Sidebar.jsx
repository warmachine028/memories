import * as React from 'react'
import logo from '../images/memories.png'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Avatar, ButtonGroup, Container, Icon, IconButton } from '@mui/material'
import { Close, Computer, DarkMode, LightMode, Person2, X } from '@mui/icons-material'
import { useTheme } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'

const SideBar = ({ open, setOpen }) => {
	const navigate = useNavigate()
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen)
	}
	const handleClick = () => {
		setOpen(false)
		navigate('/')
	}
	const { Themes, mode, switchTheme } = useTheme()
	const DrawerList = (
		<Box sx={{ width: '100vw' }} role="presentation" onClick={toggleDrawer(false)}>
			<Container maxWidth="sm" sx={{ w: '100%', display: 'flex', justifyContent: 'end', p: 2 }}>
				<IconButton onClick={toggleDrawer(false)}>
					<Close />
				</IconButton>
			</Container>
			<List>
				<ListItem sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<Button onClick={handleClick}>
						<img src={logo} alt="logo" width={'200'} />
					</Button>
				</ListItem>
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
			<List>
				<ListItem>
					<ButtonGroup>
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
				</ListItem>

				{['Profile'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton href="/user">
							<ListItemIcon>
								<Avatar src="https://www.gravatar.com/avatar/e2b3127c877367bce1892635ffe153d0?s=128&d=identicon&r=PG" />
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			<Drawer open={open} onClose={() => toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	)
}

export default SideBar
