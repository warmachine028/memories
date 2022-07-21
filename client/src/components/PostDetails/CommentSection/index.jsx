import { useState, useRef } from 'react'
import { Typography, TextField, Button, IconButton, Avatar, Box, Grow } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { commentPost, deleteComment } from '../../../actions/posts'
import { Root, classes } from './styles'
import moment from 'moment'

const LegacyComment = ({ comment: _comment }) => {
	const name = _comment.split(': ')[0]
	const comment = _comment.split(': ')[1]
	return (
		<Grow in={true} mountOnEnter unmountOnExit>
			<div className={classes.commentContainer}>
				<Avatar style={{ margin: 5 }}>{name[0]}</Avatar>
				<Box className={classes.commentBox}>
					<div className={classes.commentItem}>
						<Typography className={classes.userName}>{name}</Typography>
						<Typography className={classes.comment} component="p">
							{comment}
						</Typography>
						<Typography className={classes.time}>A long time ago</Typography>
					</div>
				</Box>
			</div>
		</Grow>
	)
}

const Comment = ({ comment: _comment, post, userId, setComments, comments }) => {
	const dispatch = useDispatch()
	const { name, comment, creator, commentId, createdAt } = _comment
	const { _id: postId, creator: postCreator } = post

	const removeComment = async (commentId) => {
		setComments(comments.filter(({ newComment }) => newComment?.commentId !== commentId))
		const newComments = await dispatch(deleteComment(postId, commentId))
		setComments(newComments)
	}
	const canDelete = userId && [creator, postCreator].includes(userId)

	return (
		<Grow in={true} mountOnEnter unmountOnExit>
			<div className={classes.commentContainer}>
				<Avatar style={{ margin: 5 }}>{name[0]}</Avatar>
				<Box className={classes.commentBox}>
					<div className={classes.commentItem}>
						<Typography className={classes.userName}>{name}</Typography>
						<Typography className={classes.comment} component="p">
							{comment}
						</Typography>
						<Typography className={classes.time}>{moment(createdAt).format('Do MMMM YYYY, dddd, h:mm A')}</Typography>
					</div>

					<IconButton aria-label="delete" size="small" style={{ color: '#ae0050', display: canDelete ? 'inline-flex' : 'none' }} onClick={() => removeComment(commentId)}>
						<Delete fontSize="1rem" />
					</IconButton>
				</Box>
			</div>
		</Grow>
	)
}

const CommentSection = ({ post, user }) => {
	const dispatch = useDispatch()
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState(post?.comments)
	const commentsRef = useRef()
	const userId = user?.result.googleId || user?.result._id
	const handleComment = async () => {
		const newComment = {
			commentId: null,
			name: user.result.name,
			comment: comment,
			creator: userId,
			createdAt: new Date().toISOString(),
		}
		setComments([...comments, { newComment }])
		setComment('')
		const newComments = await dispatch(commentPost(newComment, post._id))
		setComments(newComments)
	}

	return (
		<Root className={classes.root}>
			<div className={classes.outerContainer}>
				<div style={{ width: '100%', display: Object.keys(comments).length ? 'block' : 'none' }}>
					<Typography gutterBottom variant="h6">
						Comments
					</Typography>
					<div className={classes.innerContainer}>
						{Object.entries(comments)?.map(([i, { newComment: comment }]) => (comment?.name ? <Comment key={i} comment={comment} userId={userId} post={post} setComments={setComments} comments={comments} /> : <LegacyComment key={i} comment={comments[i]} />))}
						<div ref={commentsRef} />
					</div>
				</div>
				<div style={{ width: '100%', display: userId ? 'block' : 'none' }}>
					<Typography gutterBottom variant="h6">Write a comment</Typography>
					<TextField InputProps={{ style: { color: 'white' } }} fullWidth rows={10} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
					<Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.trim().length} color="primary" variant="contained" onClick={handleComment}>
						Comment
					</Button>
				</div>
			</div>
		</Root>
	)
}

export default CommentSection
