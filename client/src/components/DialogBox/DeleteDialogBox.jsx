import { DialogActions, DialogContent, DialogContentText, Button, Dialog, DialogTitle, ButtonGroup, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

const DeleteDialogBox = (props) => {
	const { isDeletingPost } = useSelector((state) => state.posts) // [] -> { isLoading, posts: [] }
	const { open, setOpen, post, callBack } = props
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle id="alert-dialog-title">Move your post to bin?</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Post with postId <strong>{post._id}</strong> witll be deleted permanently. This is an irreversible action and the post can not be recovered again. All likes, comemnts, associated with this post will also be removed from our database.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<ButtonGroup variant="contained" disabled={isDeletingPost}>
					<Button onClick={handleClose}>CANCEL</Button>
					<Button onClick={callBack} color="secondary">
						{isDeletingPost ? <CircularProgress size="1.5em" /> : 'MOVE'}
					</Button>
				</ButtonGroup>
			</DialogActions>
		</Dialog>
	)
}

export default DeleteDialogBox
