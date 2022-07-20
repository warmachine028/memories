import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import { useState } from 'react'
import { CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Card } from '@mui/material'
import { Root, classes } from './styles'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useNavigate } from 'react-router-dom'

const Post = ({ post, setCurrentId, user, snackBar }) => {
	const dispatch = useDispatch()
	const history = useNavigate()
	const [likes, setLikes] = useState(post?.likes)
	const userId = user?.result.googleId || user?.result?._id
	const hasLikedPost = likes.find((like) => like === userId)

	const handleLike = async () => {
		dispatch(likePost(post._id))
		setLikes(hasLikedPost ? likes.filter((id) => id !== userId) : [...likes, userId])
	}
	const Likes = () => {
		if (likes.length > 0)
			return hasLikedPost ? (
				<Typography variant="body2" sx={{ align: 'center', display: 'flex' }}>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} Like${likes.length > 1 ? 's' : ''}`}
				</Typography>
			) : (
				<Typography variant="body2" sx={{ color: '#000000', align: 'center', display: 'flex' }}>
					<ThumbUpAltOutlined fontSize="small" sx={{ color: '#000000' }} />
					&nbsp; {`${likes.length} Like${likes.length > 1 ? 's' : ''}`}
				</Typography>
			)
		return (
			<Typography variant="body2" color="primary" sx={{ color: '#000000', align: 'center', display: 'flex' }}>
				<ThumbUpAltOutlined fontSize="small" sx={{ color: '#000000' }} />
				&nbsp; Like
			</Typography>
		)
	}
	const isLongMessage = post.message.length > 100
	const openPost = () => history(`/posts/${post._id}`)
	return (
		<Root className={classes.root}>
			<Card className={classes.card} raised elevation={6}>
				<ButtonBase className={classes.cardAction} onClick={openPost} component="span">
					<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
					<div className={classes.overlay}>
						<Typography variant="h6" sx={{ color: 'white' }}>
							{post.name}
						</Typography>
						<Typography variant="body2" sx={{ color: 'white' }}>
							{moment(post.createdAt).fromNow()}
						</Typography>
					</div>
					<div className={classes.details}>
						<div className={classes.tags}>
							<Typography variant="body2" color="textSecondary">
								{post.tags.map((tag) => `#${tag} `)}
							</Typography>
						</div>

						<Typography className={classes.title} variant="h5" align="center" gutterBottom>
							{post.title}
						</Typography>
						{post._private && (
							<div align="center">
								<Button variant="contained" className={classes.privateLabel} size="small" disableElevation>
									PRIVATE
								</Button>
							</div>
						)}
						<CardContent>
							<Typography variant="body2" sx={{ color: 'white', wordWrap: 'break-word' }} component="p" textAlign={isLongMessage ? 'justify' : 'center'}>
								{`${post.message.slice(0, 100)} ${isLongMessage ? '...' : ''}`}
							</Typography>
						</CardContent>
					</div>
				</ButtonBase>
				{userId === post?.creator && (
					<div className={classes.overlay2}>
						<Button style={{ color: 'whitesmoke' }} size="small" onClick={() => setCurrentId(post._id)}>
							<MoreHorizIcon fontSize="medium" />
						</Button>
					</div>
				)}
				<CardActions className={classes.cardActions}>
					<Button size="small" color="primary" disabled={!user?.result} onClick={handleLike} style={{ align: 'center' }}>
						<Likes />
					</Button>
					{userId === post?.creator && (
						<Button size="small" style={{ color: '#ae0050' }} onClick={() => dispatch(deletePost(post._id, snackBar))}>
							<DeleteIcon fontSize="small" /> &nbsp; Delete{' '}
						</Button>
					)}
				</CardActions>
			</Card>
		</Root>
	)
}

export default Post
