import { movies } from '@/data'
import {
	Autocomplete,
	Button,
	FormControl,
	FormGroup,
	Paper,
	Stack,
	TextField
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Search = () => {
	const navigate = useNavigate()
	const handleSearchInput = (params) => (
		<TextField
			{...params}
			label="Search Tags"
			slotProps={{ input: { ...params.InputProps, type: 'search' } }}
		/>
	)

	const handleSubmit = (event) => {
		event.preventDefault()
		navigate(`/search/${searchTerm}`)
	}

	return (
		<Paper>
			<Stack component="form" onSubmit={handleSubmit} spacing={1} p={2}>
				<FormGroup className="mb-3">
					<TextField
						id="title"
						label="Search Memories"
						variant="outlined"
					/>
				</FormGroup>
				<FormControl fullWidth>
					<Autocomplete
						freeSolo
						id="free-solo-2-demo"
						multiple
						options={movies.map((option) => option.title)}
						renderInput={handleSearchInput}
					/>
				</FormControl>
				<Button
					variant="contained"
					type="submit"
					color="success"
					fullWidth
				>
					Search
				</Button>
			</Stack>
		</Paper>
	)
}

export default Search
