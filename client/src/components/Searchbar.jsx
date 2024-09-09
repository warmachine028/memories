import { useSnackbar } from '@/hooks'
import { Search as SearchIcon } from '@mui/icons-material'
import { alpha, Box, InputBase, styled } from '@mui/material'
import { useCallback, useState } from 'react'

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
	const { openSnackBar } = useSnackbar()
	const [search, setSearch] = useState()

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault()
			openSnackBar('success', `Hurrray! 🎊🎊, You searched for "${search}"`)
		},
		[openSnackBar, search]
	)

	const handleChange = useCallback((e) => setSearch(e.target.value), [])

	return (
		<Search display={{ xs: 'block', md: 'none' }} component={'form'} onSubmit={handleSubmit}>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase placeholder="Search Memories" onChange={handleChange} />
		</Search>
	)
}

export default Searchbar
