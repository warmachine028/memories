import { movies } from '@/data'
import { Autocomplete, Box, Button, FormControl, FormGroup, Paper, TextField } from '@mui/material'
import { useCallback } from 'react'

const Search = () => {
	const handleSearchInput = useCallback((params) => <TextField {...params} label="Search Tags" slotProps={{ input: { ...params.InputProps, type: 'search' } }} />, [])

	const handleSubmit = useCallback((event) => {
		event.preventDefault()
		console.log('Submitted')
	}, [])

	return (
		<Paper sx={{ padding: 2 }}>
			<Box gap={1} width={1} display="flex" flexDirection="column" component="form" onSubmit={handleSubmit}>
				<FormGroup className="mb-3">
					<TextField id="title" label="Search Memories" variant="outlined" />
				</FormGroup>
				<FormControl fullWidth>
					<Autocomplete freeSolo id="free-solo-2-demo" multiple options={movies.map((option) => option.title)} renderInput={handleSearchInput} />
				</FormControl>
				<Button variant="contained" type="submit" color="success" fullWidth>
					Search
				</Button>
			</Box>
		</Paper>
	)
}

export default Search
