import { useState, useRef } from 'react'
import { CircularProgress, Typography, TextField, Button, IconButton, Avatar, Box } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { commentPost, deleteComment } from '../../actions/posts'
import { Root, classes } from './styles'
import moment from 'moment'

const LegacyComment = ({ comment }) => {
	return (
		<div className={classes.comment}>
			<Avatar style={{ margin: 5 }}>{comment.split(': ')[0][0]}</Avatar>
			<Box
				style={{
					width: '100%',
					margin: 5,
					height: 'fit-content',
					borderRadius: 5,
					backgroundColor: 'rgba(255, 255, 255, .09)',
					display: 'flex',
					alignItems: 'center',
					paddingLeft: 5,
				}}
			>
				<div
					style={{
						flexDirection: 'column',
						width: '100%',
						padding: 10,
					}}
				>
					<Typography style={{ fontWeight: 600, color: 'black' }}>{comment.split(': ')[0]}</Typography>
					<Typography style={{ textAlign: 'justify', marginLeft: 10 }} color="white">
						{comment.split(': ')[1]}
					</Typography>
					<Typography style={{ textAlign: 'end', marginLeft: 10, fontSize: 'small' }} color="rgba(255, 255, 255, .30)">
						A long time ago
					</Typography>
				</div>
			</Box>
		</div>
	)
}

const Comment = ({ comment: _comment, post, userId, setComments }) => {
	const dispatch = useDispatch()
	const [deleting, setDeleting] = useState(false)
	const [deletingCommentId, setDeletingCommentId] = useState(null)
	const { name, comment, creator, commentId, createdAt } = _comment
	const { _id: postId, postCreator } = post

	const removeComment = async (commentId) => {
		setDeleting(true)
		setDeletingCommentId(commentId)
		const newComments = await dispatch(deleteComment(postId, commentId))
		setDeletingCommentId(null)
		setDeleting(false)
		setComments(newComments)
	}

	const canDelete = [creator, postCreator].includes(userId)
	return (
		<div className={classes.comment}>
			<Avatar style={{ margin: 5 }}>{name[0]}</Avatar>
			<Box
				style={{
					width: '100%',
					margin: 5,
					height: 'fit-content',
					borderRadius: 5,
					backgroundColor: 'rgba(255, 255, 255, .09)',
					display: 'flex',
					alignItems: 'center',
					paddingLeft: 5,
				}}
			>
				<div
					style={{
						flexDirection: 'column',
						width: '100%',
						padding: 10,
					}}
				>
					<Typography style={{ fontWeight: 600, color: 'black' }}>{name}</Typography>
					<Typography style={{ textAlign: 'justify', marginLeft: 10 }} color="white">
						{comment}
					</Typography>
					<Typography style={{ textAlign: 'end', marginLeft: 10, fontSize: 'small' }} color="rgba(255, 255, 255, .30)">
						{moment(createdAt).format('Do MMMM YYYY, dddd, h:mm A')}
					</Typography>
				</div>

				<IconButton aria-label="delete" size="small" style={{ color: '#ae0050', display: canDelete ? 'inline-flex' : 'none' }} onClick={() => removeComment(commentId)}>
					{deleting && commentId === deletingCommentId ? <CircularProgress fontSize="small" /> : <Delete fontSize="1rem" />}
				</IconButton>
			</Box>
		</div>
	)
}

const CommentSection = ({ post, user }) => {
	const dispatch = useDispatch()
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState(post?.comments)
	const commentsRef = useRef()
	const [posting, setPosting] = useState(false)
	const userId = user?.result.googleId || user?.result._id

	const handleComment = async () => {
		const temp = comment
		setComment('')
		setPosting(true)
		const newComments = await dispatch(commentPost({ name: user.result.name, comment: temp }, post._id))
		setPosting(false)
		setComments(newComments)
		commentsRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<Root className={classes.root}>
			<div className={classes.commentsOuterContainer}>
				<div style={{ width: '100%', display: Object.keys(comments).length ? 'block' : 'none' }}>
					<Typography gutterBottom variant="h6" style={{ width: '100%' }}>
						Comments
					</Typography>
					<div className={classes.commentsInnerContainer}>
						{Object.entries(comments)?.map(([i, { newComment: comment }]) => (comment?.name ? <Comment key={i} comment={comment} userId={userId} post={post} setComments={setComments} /> : <LegacyComment comment={comments[i]}/>))}
						<div style={{ display: posting ? 'flex' : 'none', justifyContent: 'center' }}>
							<CircularProgress />
						</div>
						<div ref={commentsRef} />
					</div>
				</div>
				<div style={{ width: '100%', display: userId ? 'block' : 'none' }}>
					<Typography gutterBottom variant="h6">
						Write a comment
					</Typography>
					<TextField InputProps={{ style: { color: 'white' } }} fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
					<Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.trim().length} color="primary" variant="contained" onClick={handleComment}>
						Comment
					</Button>
				</div>
			</div>
		</Root>
	)
}

export default CommentSection

/*

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
*/
