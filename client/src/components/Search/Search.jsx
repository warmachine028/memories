import { useContext, useState } from 'react'
// import ChipInput from '../ChipInput/ChipInput'
import { MuiChipsInput } from 'mui-chips-input'
import { Root, classes } from './styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPostsBySearch } from '../../actions/posts'
import { AppBar, TextField, Button } from '@mui/material'
import { ModeContext } from '../../contexts/ModeContext'

const Search = ({ tags, setTags }) => {
	const dispatch = useDispatch()
	const history = useNavigate()
	const [search, setSearch] = useState('')

	const searchPost = () => {
		//dispatch -> fetch search post
		if (search.trim() || tags) {
			let tagList = tags.map((tag) => tag.toLowerCase());
			dispatch(getPostsBySearch({ search, tags: tagList.join(',') }))
			history(`/posts/search?searchQuery=${search || 'none'}&tags=${tagList.join(',')}`)
		} else history('/')
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') searchPost()
	}

	// const handleAdd = (tag) => setTags([...tags, tag])
	// const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))
	const handleChange = (newTags) => {
		setTags(newTags)
	}

	const { mode } = useContext(ModeContext)

	return (
		<Root className={classes.root}>
			<AppBar className={`${classes.searchBarLight} ${mode === 'light' ? classes.searchBarLight : classes.searchBarDark}`} position="static" color="inherit">
				<TextField sx={{ input: { color: 'white' } }} name="search" variant="outlined" label="Search Memories" onKeyDown={handleKeyPress} fullWidth value={search} onChangeCapture={(e) => setSearch(e.target.value)} />
				{/* <ChipInput label="Search Tags" InputProps={{ style: { color: 'white' } }} value={tags} newChipKeyCodes={[188, 13]} onAdd={handleAdd} onDelete={handleDelete} variant="outlined" className={classes.chip} /> */}
				<MuiChipsInput
					label="Search Tags"
					value={tags}
					onChange={handleChange}
					clearInputOnBlur
					hideClearAll
					placeholder=""
					sx={{
						width: '100%',
						input: {
							color: 'white',
						},
					}}
					className={classes.chip}
				/>

				<Button className={classes.buttonSearch} onClick={searchPost} color="primary" variant="contained">
					SEARCH
				</Button>
			</AppBar>
		</Root>
	)
}

export default Search
