import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Stack,
	TextField
} from '@mui/material'
import {
	ContentCopy,
	Facebook,
	LinkedIn,
	X,
	WhatsApp
} from '@mui/icons-material'
import { useStore } from '@/store'

const SharePostDialog = ({ url, open, setOpen }) => {
	const handleClose = () => setOpen(false)

	const shareUrls = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
		whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
	}
	const { openSnackbar } = useStore()
	const handleCopy = () =>{
		navigator.clipboard.writeText(url).then(() => {
			openSnackbar('Link copied to clipboard', 'info')
		})
		handleClose()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="share-post-dialog-title"
			fullWidth
			aria-describedby="share-post-dialog-description"
			PaperProps={{ elevation: 0 }}
		>
			<DialogTitle id="share-dialog-title">Share this post</DialogTitle>

			<DialogContent>
				<DialogContentText
					id="share-post-dialog-description"
					color="textDisabled"
					gutterBottom
				>
					Share this post to your favourite social media platforms
				</DialogContentText>
				<Stack gap={1}>
					<TextField
						fullWidth
						value={url}
						slotProps={{
							input: {
								readOnly: true,
								endAdornment: (
									<IconButton
										onClick={handleCopy}
										aria-label="Copy link"
									>
										<ContentCopy />
									</IconButton>
								)
							}
						}}
					/>
					<Stack direction="row" spacing={2} justifyContent="center">
						<IconButton
							onClick={() =>
								window.open(shareUrls.facebook, '_blank')
							}
							aria-label="Share on Facebook"
						>
							<Facebook color="primary" />
						</IconButton>
						<IconButton
							onClick={() =>
								window.open(shareUrls.twitter, '_blank')
							}
							aria-label="Share on Twitter"
						>
							<X />
						</IconButton>
						<IconButton
							onClick={() =>
								window.open(shareUrls.linkedin, '_blank')
							}
							aria-label="Share on LinkedIn"
						>
							<LinkedIn color="info" />
						</IconButton>
						<IconButton
							onClick={() =>
								window.open(shareUrls.whatsapp, '_blank')
							}
							aria-label="Share on WhatsApp"
						>
							<WhatsApp color="success" />
						</IconButton>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	)
}

export default SharePostDialog
