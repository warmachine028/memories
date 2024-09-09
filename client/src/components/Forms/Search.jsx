import { movies } from '@/data'
import { Autocomplete, Button, FormControl, FormGroup, Paper, TextField } from '@mui/material'
import { useCallback } from 'react'

const Search = () => {
	const handleSearchInput = useCallback(
		(params) => (
			<TextField
				{...params}
				label="Search Tags"
				slotProps={{
					input: {
						...params.InputProps,
						type: 'search'
					}
				}}
			/>
		),
		[]
	)

	const handleSubmit = useCallback((event) => {
		event.preventDefault()
		console.log('Submitted')
	}, [])
	return (
		<Paper sx={{ padding: 2 }}>
			<form
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					gap: 5
				}}
				onSubmit={handleSubmit}
			>
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						marginBottom: 9
					}}
				>
					<FormGroup className="mb-3">
						<TextField id="title" label="Search Memories" variant="outlined" />
					</FormGroup>
					<FormControl fullWidth>
						<Autocomplete freeSolo id="free-solo-2-demo" multiple options={movies.map((option) => option.title)} renderInput={handleSearchInput} />
					</FormControl>
				</div>
				<Button variant="contained" type="submit" color="success" fullWidth>
					Search
				</Button>
			</form>
		</Paper>
	)
}

export default Search
