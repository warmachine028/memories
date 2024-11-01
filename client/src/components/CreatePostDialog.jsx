import { Dialog } from '@mui/material'
import { CreatePost } from './forms'

const CreatePostDialog = ({ open, setOpen }) => {
	const handleClose = () => setOpen(false)

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<CreatePost />
		</Dialog>
	)
}
export default CreatePostDialog
