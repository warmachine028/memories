import { Autocomplete, Box, Button, ButtonGroup, FormControl, FormGroup, Paper, Stack, TextField, Typography } from '@mui/material'
import { useCallback } from 'react'
import { movies } from '@/data'

const CreatePost = () => {
	const handleSubmit = useCallback((event) => {
		event.preventDefault()
		console.log('Submitted')
	}, [])
	const handleSearchInput = (params) => <TextField {...params} label="Tags" slotProps={{ input: { ...params.InputProps, type: 'search' } }} />

	return (
		<Paper sx={{ p: 3, display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column', gap: 5, width: { md: 'auto' } }}>
			<Stack width="100%" component={'form'} onSubmit={handleSubmit} gap={1}>
				<Typography variant="h6" gutterBottom>
					Create a Post
				</Typography>
				<Stack gap={1} width="100%">
					<FormGroup>
						<TextField label="Title" variant="outlined" />
					</FormGroup>
					<FormGroup>
						<TextField label="Description" variant="outlined" rows={4} multiline />
					</FormGroup>
					<FormControl>
						<Autocomplete freeSolo multiple options={movies.map((option) => option.title)} renderInput={handleSearchInput} />
					</FormControl>
				</Stack>
				<ButtonGroup orientation="vertical" fullWidth variant="contained">
					<Button type="submit">Create</Button>
					<Button color="secondary" type="reset">Clear</Button>
				</ButtonGroup>
			</Stack>
		</Paper>
	)
}

export default CreatePost
