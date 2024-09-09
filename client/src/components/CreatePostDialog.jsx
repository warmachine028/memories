import { useCallback } from 'react'
import { Dialog } from '@mui/material'
import { CreatePost } from './Forms'

const CreatePostDialog = ({ open, setOpen }) => {
	const handleClose = useCallback(() => {
		setOpen(false)
	}, [setOpen])

	return (
		<Dialog open={open} onClose={handleClose}>
			<CreatePost />
		</Dialog>
	)
}
export default CreatePostDialog
