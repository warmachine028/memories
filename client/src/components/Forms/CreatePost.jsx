import { Button, FormGroup, Paper, TextField, Typography } from '@mui/material'

const CreatePost = () => {
	return (
		<Paper sx={{ padding: 2 }}>
			<form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 5 }}>
				<Typography variant="h6">Create a Post</Typography>
				<div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 9 }}>
					<FormGroup className="mb-3">
						<TextField id="title" label="Title" variant="outlined" />
					</FormGroup>
					<FormGroup className="mb-3">
						<TextField id="description" label="Description" variant="outlined" rows={4} multiline />
					</FormGroup>
				</div>
				<Button variant="contained" type="submit" fullWidth>
					Create
				</Button>
			</form>
		</Paper>
	)
}

export default CreatePost
