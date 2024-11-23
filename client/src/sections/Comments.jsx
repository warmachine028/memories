import { useState } from 'react'
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Fade,
	Skeleton,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import { Send, ArrowDownward, Cancel } from '@mui/icons-material'
import { useUser } from '@clerk/clerk-react'
import { UserAvatar } from '@/components'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateComment, useGetComments } from '@/hooks'
import { Comment } from '@/components'

const CommentInput = ({ postId }) => {
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

const Comments = () => {
	const { id: postId } = useParams()
	const {
		data: comments,
		isPending,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isError,
		error
	} = useGetComments(postId)

	if (isPending) {
		return (
			<Card sx={{ width: '100%' }}>
				<div className="h-10 w-full">
					<Skeleton variant="text" height={10} />
				</div>
			</Card>
		)
	}

	if (isError) {
		return (
			<Card sx={{ width: '100%' }}>
				<Typography>Error loading comments: {error}</Typography>
			</Card>
		)
	}

	const allComments = comments.pages.flatMap((page) => page.comments)

	return (
		<Card sx={{ width: '100%' }}>
			<CardHeader title={`${allComments.length} Comments`} />
			<CardContent>
				<CommentInput postId={postId} />
				{allComments.map((comment) => (
					<Comment comment={comment} key={comment.id} />
				))}

				{hasNextPage && (
					<Button
						onClick={fetchNextPage}
						endIcon={
							isFetchingNextPage ? (
								<CircularProgress size={24} />
							) : (
								<ArrowDownward />
							)
						}
						disabled={isFetchingNextPage}
					>
						Load More Comments
					</Button>
				)}
			</CardContent>
		</Card>
	)
}

export default Comments
