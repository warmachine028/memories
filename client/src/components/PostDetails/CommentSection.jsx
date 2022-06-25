import { useState, useRef } from 'react'
import { CircularProgress, Typography, TextField, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { commentPost, deleteComment } from '../../actions/posts'
import { Root, classes } from './styles'

const CommentSection = ({ post, user }) => {
	const dispatch = useDispatch()
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState(post?.comments)
	const commentsRef = useRef()
	const [posting, setPosting] = useState(false)
	const [deleting, setDeleting] = useState(false)
	const [deletingCommentId, setDeletingCommentId] = useState(null)
	const userId = user?.result.googleId || user?.result?._id

	const handleComment = async () => {
		const temp = comment
		setComment('')
		setPosting(true)
		// const newComments = await dispatch(commentPost(`${user?.result?.name}: ${temp}`, post._id))
		const newComments = await dispatch(commentPost({ name: user?.result?.name, comment: temp }, post._id))
		setPosting(false)
		setComments(newComments)
		commentsRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	const removeComment = async (commentId) => {
		setDeleting(true)
		setDeletingCommentId(commentId)
		const newComments = await dispatch(deleteComment(post._id, commentId))
		setDeletingCommentId(null)
		setDeleting(false)
		setComments(newComments)
	}

	return (
		<Root className={classes.root}>
			<div className={classes.commentsOuterContainer}>
				{Object.keys(comments).length !== 0 && (
					<div style={{ width: '100%' }}>
						<Typography gutterBottom variant="h6" style={{ width: '100%' }}>
							Comments
						</Typography>
						<div className={classes.commentsInnerContainer}>
							{Object.entries(comments)?.map(([i, { newComment: comment }]) => (
								<div key={i} className={classes.comment}>
									<Typography gutterBottom variant="subtitle1" className={classes.commentText}>
										<strong style={{ color: 'black' }}>{comment?.name ? comment.name : comments[i].split(': ')[0]}: </strong>
										<Typography style={{ textAlign: 'justify', paddingLeft: '3px' }}>{comment?.comment ? comment?.comment : comments[i].split(': ')[1]} </Typography>
									</Typography>
									{(userId === post.creator || userId === comment?.creator) && (
										<IconButton aria-label="delete" size="small" style={{ color: '#ae0050' }} onClick={() => removeComment(comment?.commentId)}>
											{deleting && comment?.commentId === deletingCommentId ? <CircularProgress fontSize="small" /> : <DeleteIcon fontSize="1rem" />}
										</IconButton>
									)}
								</div>
							))}
							{posting && (
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<CircularProgress />
								</div>
							)}
							<div ref={commentsRef} />
						</div>
					</div>
				)}
				{user?.result?.name && (
					<div style={{ width: '100%' }}>
						<Typography gutterBottom variant="h6">
							Write a comment
						</Typography>
						<TextField InputProps={{ style: { color: 'white' } }} fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
						<br />
						<Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
							Comment
						</Button>
					</div>
				)}
			</div>
		</Root>
	)
}

export default CommentSection
