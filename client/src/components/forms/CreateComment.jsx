import { useState } from 'react'
import { Box, Button, ButtonGroup, Fade, Stack, TextField } from '@mui/material'
import { Send, Cancel } from '@mui/icons-material'
import { useUser } from '@clerk/clerk-react'
import { UserAvatar } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useCreateComment } from '@/hooks'

const CreateComment = ({ postId }) => {
	const { user } = useUser()
	const navigate = useNavigate()
	const [comment, setComment] = useState('')
	const { mutate: createComment } = useCreateComment(postId)

	const handleSubmit = (e) => {
		e.preventDefault()
		createComment({ content: comment })
		handleReset()
	}

	const handleReset = () => {
		setComment('')
	}

	const handleChange = (e) => setComment(e.target.value)

	if (!user) {
		return null
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			mb={7}
			onReset={handleReset}
		>
			<Stack gap={1} direction="row" mb={1} alignItems="center">
				<UserAvatar user={user} onClick={() => navigate('/user')} />
				<TextField
					multiline
					maxRows={3}
					fullWidth
					placeholder="Add a comment..."
					value={comment}
					onChange={handleChange}
				/>
			</Stack>
			<Fade in={comment.trim()}>
				<ButtonGroup variant="contained" sx={{ float: 'right' }}>
					<Button type="reset" endIcon={<Cancel />} color="secondary">
						Cancel
					</Button>
					<Button type="submit" endIcon={<Send />}>
						Comment
					</Button>
				</ButtonGroup>
			</Fade>
		</Box>
	)
}

export default CreateComment
