import { Autocomplete, Box, Button, ButtonGroup, FormControl, FormGroup, Paper, TextField, Typography } from '@mui/material'
import { useCallback } from 'react'
import { movies } from '@/data'

const CreatePost = () => {
	const handleSubmit = useCallback((event) => {
		event.preventDefault()
		console.log('Submitted')
	}, [])
	const handleSearchInput = useCallback(
		(params) => (
			<TextField
				{...params}
				label="Tags"
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

	return (
		<Paper sx={{ p: 3, display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column', gap: 5, width: { md: 'auto' } }}>
			<Box sx={{ width: '100%' }} component={'form'} onSubmit={handleSubmit}>
				<Typography variant="h6" gutterBottom>
					Create a Post
				</Typography>
				<Box
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						marginBottom: 9
					}}
				>
					<FormGroup className="mb-3">
						<TextField id="title" label="Title" variant="outlined" />
					</FormGroup>
					<FormGroup className="mb-3">
						<TextField id="description" label="Description" variant="outlined" rows={4} multiline />
					</FormGroup>
					<FormControl fullWidth>
						<Autocomplete freeSolo id="free-solo-2-demo" multiple options={movies.map((option) => option.title)} renderInput={handleSearchInput} />
					</FormControl>
				</Box>
				<ButtonGroup orientation="vertical" fullWidth>
					<Button variant="contained" type="submit">
						Create
					</Button>
					<Button variant="contained" color="secondary" type="clear">
						Clear
					</Button>
				</ButtonGroup>
			</Box>
		</Paper>
	)
}

export default CreatePost
