import { Search as SearchIcon } from '@mui/icons-material'
import { alpha, Box, InputBase, styled } from '@mui/material'
import { useState } from 'react'
import { useLocation } from 'react-router'
import { useStore } from '@/store'

const Search = styled(Box)(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('xs')]: {
		width: 'auto'
	}
}))

const SearchIconWrapper = styled(Box)(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',

	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('xs')]: {
			width: '20ch',
			'&:focus': {
				width: '33ch'
			}
		}
	}
}))
const Searchbar = () => {
	const [search, setSearch] = useState('')
	const { pathname } = useLocation()
	const { openSnackbar } = useStore()
	const handleSubmit = (event) => {
		event.preventDefault()
		if (!search) {
			return
		}
		const securityLevels = ['info', 'warning', 'error', 'success']

		const lowerCaseSearch = search.toLowerCase()
		const foundLevel = securityLevels.find((level) =>
			lowerCaseSearch.includes(level)
		)

		if (foundLevel) {
			openSnackbar({
				severity: foundLevel || 'success',
				message: `Alert! You searched for a term containing "${foundLevel}".`
			})
		} else {
			openSnackbar({
				severity: 'success',
				message: `Hurrray! 🎊🎊, You searched for "${search}"`
			})
		}
		setSearch('')
	}

	const handleChange = (e) => setSearch(e.target.value)

	if (pathname !== '/posts') {
		return null
	}

	return (
		<Search
			display={{ xs: 'block', md: 'none' }}
			component="form"
			onSubmit={handleSubmit}
		>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search Memories"
				value={search}
				onChange={handleChange}
			/>
		</Search>
	)
}

export default Searchbar
