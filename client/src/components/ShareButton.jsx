import { Share } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { SharePostDialog } from './dialogues'

const ShareButton = ({ url }) => {
	const [showDialog, setShowDialog] = useState(false)

	return (
		<>
			<IconButton onClick={() => setShowDialog(true)} color="primary">
				<Share />
			</IconButton>
			<SharePostDialog
				url={url}
				open={showDialog}
				setOpen={setShowDialog}
			/>
		</>
	)
}

export default ShareButton
