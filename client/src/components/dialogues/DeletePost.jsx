import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	ButtonGroup
} from '@mui/material'
import { Delete } from '@mui/icons-material'

const DeletePostDialog = ({ onDelete: handleDelete, open, setOpen }) => {
	const handleClose = () => setOpen(false)

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="delete-post-dialog-title"
			fullWidth
			aria-describedby="delete-post-dialog-description"
			PaperProps={{ elevation: 0 }}
		>
			<DialogTitle id="delete-post-dialog-title">
				Delete Post
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="delete-post-dialog-description">
					Are you sure you want to delete this post? This action
					cannot be undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<ButtonGroup>
					<Button onClick={handleClose} size="small">
						Cancel
					</Button>
					<Button
						size="small"
						onClick={handleDelete}
						color="error"
						variant="contained"
						startIcon={<Delete />}
					>
						Delete
					</Button>
				</ButtonGroup>
			</DialogActions>
		</Dialog>
	)
}

export default DeletePostDialog
