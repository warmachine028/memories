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

const DeleteCommentDialog = ({ onDelete: handleDelete, open, setOpen }) => {
	const handleClose = () => setOpen(false)

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="delete-comment-dialog-title"
			fullWidth
			aria-describedby="delete-comment-dialog-description"
			PaperProps={{ elevation: 0 }}
		>
			<DialogTitle id="delete-comment-dialog-title">
				Delete Comment
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="delete-comment-dialog-description">
					Are you sure you want to delete this comment? This action
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

export default DeleteCommentDialog
