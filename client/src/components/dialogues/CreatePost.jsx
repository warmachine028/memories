import { Dialog } from '@mui/material'
import { CreatePost } from '@/components'

const CreatePostDialog = ({ open, setOpen }) => {
	const handleClose = () => setOpen(false)

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			PaperProps={{ elevation: 0 }}
		>
			<CreatePost />
		</Dialog>
	)
}
export default CreatePostDialog
