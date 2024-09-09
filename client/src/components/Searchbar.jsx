import { openSnackbar } from '@/reducers/notif'
import { Search as SearchIcon } from '@mui/icons-material'
import { alpha, Box, InputBase, styled } from '@mui/material'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

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
	const dispatch = useDispatch()
	const [search, setSearch] = useState('')

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault()
			if (!search) {
				return
			}
			const securityLevels = ['info', 'warning', 'error', 'success']

			const lowerCaseSearch = search.toLowerCase()
			const foundLevel = securityLevels.find((level) => lowerCaseSearch.includes(level))

			if (foundLevel) {
				dispatch(
					openSnackbar({
						severity: foundLevel || 'success',
						message: `Alert! You searched for a term containing "${foundLevel}".`
					})
				)
			} else {
				dispatch(
					openSnackbar({
						severity: 'success',
						message: `Hurrray! 🎊🎊, You searched for "${search}"`
					})
				)
			}
			setSearch('')
		},
		[dispatch, search]
	)

	const handleChange = useCallback((e) => setSearch(e.target.value), [])

	return (
		<Search display={{ xs: 'block', md: 'none' }} component={'form'} onSubmit={handleSubmit}>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase placeholder="Search Memories" value={search} onChange={handleChange} />
		</Search>
	)
}

export default Searchbar
