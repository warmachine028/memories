import { useState } from 'react'
import { Avatar, Box, Button, ButtonGroup, Card, CardContent, CardHeader, Fade, IconButton, Stack, TextField, Typography } from '@mui/material'
import { ThumbUp, Send, ArrowDownward, Cancel } from '@mui/icons-material'
import { comments as dummyComments } from '@/data/comments'
import moment from 'moment'
import { useUser } from '@clerk/clerk-react'
import { UserAvatar } from '@/components'
import { Link, useNavigate } from 'react-router-dom'

const CommentInput = ({ setComments, comments }) => {
	// TODO: Fix later by add comment
	const { user } = useUser()
	const navigate = useNavigate()
	const [comment, setComment] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		const newComment = {
			id: comments.length + 1,
			author: user.fullName,
			content: comment,
			likes: 0,
			avatar: user.imageUrl
		}
		setComments([newComment, ...comments])
		setComment('')
	}
	const handleChange = (e) => setComment(e.target.value)

	if (!user) {
		return null
	}

	return (
		<Box component="form" onSubmit={handleSubmit} mb={7}>
			<Stack gap={1} direction="row" mb={1} alignItems="center">
				<UserAvatar user={user} onClick={() => navigate('/user')} />
				<TextField multiline maxRows={3} fullWidth placeholder="Add a comment..." value={comment} onChange={handleChange} />
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

const Comments = () => {
	const [comments, setComments] = useState(dummyComments)
	const [visibleComments, setVisibleComments] = useState(5)

	const handleLike = (id) => {
		setComments(comments.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment)))
	}

	return (
		<Card sx={{ width: '100%' }} elevation={3}>
			<CardHeader title={`${comments.length} Comments`} />
			<CardContent>
				<CommentInput comments={comments} setComments={setComments} />
				{comments.slice(0, visibleComments).map((comment) => (
					<Stack key={comment.id} direction="row" mb={2}>
						<Avatar src={comment.avatar} alt={comment.author} sx={{ mr: 2 }} />
						<Box sx={{ flexGrow: 1 }}>
							<Stack direction="row" alignItems="center" justifyContent="space-between">
								<Typography variant="subtitle2" component={Link} fontWeight="bold" to={`/user/${comment.author}`} sx={{ textDecoration: 'none' }} color="primary">
									{comment.author}
								</Typography>
								<Typography variant="caption" color="text.secondary.muted">
									{moment(comment.createdAt).fromNow()}
								</Typography>
							</Stack>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
								{comment.content}
							</Typography>
							<Stack direction="row" alignItems="center">
								<IconButton size="small" onClick={() => handleLike(comment.id)}>
									<ThumbUp fontSize="small" />
								</IconButton>
								<Typography variant="caption">
									{comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
								</Typography>
							</Stack>
						</Box>
					</Stack>
				))}

				{visibleComments < comments.length && (
					<Button onClick={() => setVisibleComments(visibleComments + 5)} endIcon={<ArrowDownward />}>
						Load More Comments
					</Button>
				)}
			</CardContent>
		</Card>
	)
}

export default Comments
