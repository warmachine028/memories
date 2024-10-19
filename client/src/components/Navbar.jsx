import { useState, useEffect } from 'react'
import { AppBar, Box, Toolbar, IconButton, Container, Button, ButtonGroup, Stack, useTheme, useMediaQuery, Dialog, DialogContent, TextField, Autocomplete, InputAdornment, Paper } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { Menu, Search, LoginOutlined } from '@mui/icons-material'
import { AccountMenu, ThemeSwitch, Sidebar } from '@/components'
import { brand } from '@/assets'

// Mock data for search suggestions
const searchSuggestions = [
	{ title: 'Home', url: '/' },
	{ title: 'About', url: '/about' },
	{ title: 'Products', url: '/products' },
	{ title: 'Contact', url: '/contact' }
	// Add more suggestions as needed
]

const Branding = () => {
	return (
		<Stack direction="row" spacing={2} alignItems="center" component={Link} to="/" sx={{ '&:hover': { opacity: 0.8 }, transition: 'opacity 0.3s' }}>
			<Box component="img" src="/favicon.ico" width={40} height={40} alt="logo" />
			<Box component="img" src={brand} width="auto" height={40} alt="brand" display={{ xs: 'none', sm: 'block' }} sx={{ filter: (theme) => theme.palette.mode === 'light' && 'invert(1)' }} />
		</Stack>
	)
}

const LoggedOutOptions = () => {
	const { pathname } = useLocation()
	const { isLoaded, isSignedIn } = useAuth()
	const inAuth = ['/login', '/signup', '/verify-email'].includes(pathname)

	if (!isLoaded || inAuth || isSignedIn) {
		return null
	}

	return (
		<ButtonGroup>
			<ThemeSwitch />
			<IconButton
				component={Link}
				variant="contained"
				to="/login"
				sx={{
					display: {
						xs: 'none',
						md: 'flex'
					},
					borderRadius: '10%',
					border: '1px solid',
					borderColor: 'divider',
					color: 'white',
					bgcolor: (theme) => theme.palette.primary.main
				}}
			>
				<LoginOutlined />
			</IconButton>
		</ButtonGroup>
	)
}

const SearchBar = ({ onFocus: handleFocus }) => {
	return (
		<TextField
			placeholder="Search"
			size="small"
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<Button variant="outlined" size="small" onClick={handleFocus} sx={{ minWidth: 'auto' }}>
								⌘K
							</Button>
						</InputAdornment>
					)
				}
			}}
			onClick={handleFocus}
			variant="outlined"
		/>
	)
}

const SearchDialog = ({ open, onClose: closeBox }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const navigate = useNavigate()

	const handleClose = () => {
		setSearchTerm('')
		closeBox()
	}
	const handleSearch = (_, value) => {
		if (value) {
			navigate(value.url)
			handleClose()
		}
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
			PaperProps={{
				sx: { position: 'fixed', top: '15%', m: 2 }
			}}
		>
			<Paper>
				<DialogContent>
					<Autocomplete
						freeSolo
						options={searchSuggestions}
						getOptionLabel={(option) => option.title}
						renderInput={(params) => (
							<TextField
								{...params}
								autoFocus
								fullWidth
								variant="outlined"
								placeholder="Search"
								slotProps={{
									input: {
										...params.InputProps,
										startAdornment: (
											<InputAdornment position="start">
												<Search />
											</InputAdornment>
										)
									}
								}}
							/>
						)}
						inputValue={searchTerm}
						onInputChange={(_, newValue) => setSearchTerm(newValue)}
						onChange={handleSearch}
					/>
				</DialogContent>
			</Paper>
		</Dialog>
	)
}

const Navbar = () => {
	const [open, setOpen] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)
	const handleOpen = () => setOpen(!open)
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault()
				setSearchOpen(true)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<AppBar
			position="sticky"
			elevation={0}
			sx={{
				backgroundColor: 'transparent',
				backdropFilter: 'blur(10px)',
				WebkitBackdropFilter: 'blur(10px)', // For Safari
				borderBottom: '1px solid',
				borderColor: 'divider'
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ minHeight: 64 }}>
					<Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" spacing={2}>
						<Branding />
						<Stack direction="row" alignItems="center" spacing={2}>
							{isMobile ? (
								<IconButton size="large" aria-label="menu" onClick={() => setSearchOpen(true)} color="inherit" edge="end">
									<Search />
								</IconButton>
							) : (
								<SearchBar onFocus={() => setSearchOpen(true)} />
							)}
							{isMobile ? (
								<IconButton size="large" aria-label="menu" onClick={handleOpen} color="inherit" edge="end">
									<Menu />
								</IconButton>
							) : (
								<Stack direction="row" spacing={2} alignItems="center">
									<LoggedOutOptions />
									<AccountMenu />
								</Stack>
							)}
						</Stack>
					</Stack>
				</Toolbar>
				{isMobile && open && (
					<Box py={2}>
						<Stack direction="row" justifyContent="flex-end" spacing={2}>
							<LoggedOutOptions />
							<AccountMenu />
						</Stack>
					</Box>
				)}
			</Container>
			<Sidebar open={open} setOpen={setOpen} />
			<SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
		</AppBar>
	)
}

export default Navbar
