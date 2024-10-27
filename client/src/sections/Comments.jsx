import React, { useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, TextField, Typography, useMediaQuery } from '@mui/material'
import { ThumbUp, Person, Send, ArrowDownward } from '@mui/icons-material'

const dummyComments = [
	{ id: 1, author: 'Alice Johnson', content: 'Great post! Very informative.', likes: 5, avatar: 'https://picsum.photos/seed/picsum/200' },
	{ id: 2, author: 'Bob Smith', content: 'I have a question about the third point. Can you elaborate?', likes: 3, avatar: 'https://picsum.photos/seed/picsum/200' },
	{ id: 3, author: 'Charlie Brown', content: 'Thanks for sharing this information!', likes: 7, avatar: 'https://picsum.photos/seed/picsum/200' },
	{ id: 4, author: 'Diana Prince', content: 'This helped me understand the topic better.', likes: 2, avatar: 'https://picsum.photos/seed/picsum/200' },
	{ id: 5, author: 'Ethan Hunt', content: 'Looking forward to more posts like this!', likes: 4, avatar: 'https://picsum.photos/seed/picsum/200' },
	{ id: 6, author: 'Fiona Apple', content: 'Interesting perspective on the subject.', likes: 6, avatar: 'https://picsum.photos/seed/picsum/200' },
	{ id: 7, author: 'George Lucas', content: "I'd love to see more examples in future posts.", likes: 1, avatar: 'https://picsum.photos/seed/picsum/200' }
]

const Comments = () => {
	const [comments, setComments] = useState(dummyComments)
	const [newComment, setNewComment] = useState('')
	const [visibleComments, setVisibleComments] = useState(5)

	const handleCommentSubmit = (e) => {
		e.preventDefault()
		if (newComment.trim()) {
			const comment = {
				id: comments.length + 1,
				author: 'Current User',
				content: newComment,
				likes: 0,
				avatar: '/placeholder.svg?height=40&width=40'
			}
			setComments([comment, ...comments])
			setNewComment('')
		}
	}

	const handleLike = (id) => {
		setComments(comments.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment)))
	}

	const loadMoreComments = () => {
		setVisibleComments((prevVisible) => prevVisible + 5)
	}

	return (
		<Card sx={{ width: '100%' }} elevation={3}>
			<CardHeader title="Comments" />
			<CardContent>
				<Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 4 }}>
					<Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
						<Avatar sx={{ mr: 2 }} src="https://github.com/shadcn.png">
							<Person />
						</Avatar>
						<TextField multiline rows={3} variant="outlined" fullWidth placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
					</Box>
					<Button type="submit" variant="contained" color="primary" sx={{ float: 'right' }} endIcon={<Send />}>
						Post Comment
					</Button>
				</Box>

				<Box >
					{comments.slice(0, visibleComments).map((comment) => (
						<Box key={comment.id} sx={{ display: 'flex', mb: 2 }}>
							<Avatar src={comment.avatar} alt={comment.author} sx={{ mr: 2 }} />
							<Box sx={{ flexGrow: 1 }}>
								<Typography variant="subtitle2" component="span" fontWeight="bold" color="primary.main">
									{comment.author}
								</Typography>
								<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
									{comment.content}
								</Typography>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<IconButton size="small" onClick={() => handleLike(comment.id)}>
										<ThumbUp fontSize="small" />
									</IconButton>
									<Typography variant="caption" sx={{ ml: 1 }}>
										{comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
									</Typography>
								</Box>
							</Box>
						</Box>
					))}
				</Box>

				{visibleComments < comments.length && (
					<Button onClick={loadMoreComments} sx={{ mt: 2 }} endIcon={<ArrowDownward />}>
						Load More Comments
					</Button>
				)}
			</CardContent>
		</Card>
	)
}

export default Comments
