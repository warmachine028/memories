import { CardActions, CardHeader, Card, CardContent, CardMedia, Grid, Grow, Typography, Button, Skeleton, ButtonBase } from '@mui/material'
import { ThumbUpAlt, Lock, ThumbUpAltOutlined } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { Root, classes, Comment, Media } from './styles'
import moment from 'moment'
import { useContext } from 'react'
import { ModeContext } from '../../../contexts/ModeContext'

export const LoadingCard = () => {
	return (
		<Root className={classes.root}>
			<Card raised className={classes.loadingCard}>
				<Skeleton height={190} animation="pulse" variant="rectangular" />
				<CardHeader title={<Skeleton animation="pulse" className={classes.loadingCardHeader} />} subheader={<Skeleton animation="wave" height={10} width="40%" />} />
				<CardContent sx={{ height: 190 }}>
					<Skeleton animation="wave" height={10} sx={{ mb: 1 }} />
					<Skeleton animation="wave" height={10} width="80%" />
				</CardContent>
			</Card>
		</Root>
	)
}

export const CommentLoadingCard = () => {
	return (
		<Comment in mountOnEnter unmountOnExit>
			<Grid container>
				<Grid item className={classes.commentBox} sm={12} gap={1}>
					<Skeleton animation="wave" height={90} width={130} sx={{ WebkitTransform: 'scale(1, 1)' }} />
					<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
						<Skeleton animation="wave" height={30} width={120} />
						<Skeleton animation="wave" height={20} width={50} sx={{ mb: 1 }} />
						<Skeleton animation="wave" height={21} width="90%" />
					</div>
				</Grid>
			</Grid>
		</Comment>
	)
}

export const CommentCard = ({ message, createdAt, post: { _id: postId, thumbnail: media, title } }) => {
	const { mode, modeToggle } = useContext(ModeContext)
	return (
		<Comment in mountOnEnter unmountOnExit>
			<Grid container>
				<Grid item className={classes.commentBox} sm={12}>
					<Link to={`/posts/${postId}`}>
						<Media image={media} />
					</Link>
					<div className={classes.commentItem}>
						<Typography className={`${classes.userName} ${mode === 'dark' ? classes.darkModeText : ''}`}>{title}</Typography>
						<Typography className={classes.time}>{moment(createdAt).fromNow()}</Typography>
						<Typography className={classes.comment} component="p">
							{message}
						</Typography>
					</div>
				</Grid>
			</Grid>
		</Comment>
	)
}

export const PostCard = ({ post, userId }) => {
	const { mode, modeToggle } = useContext(ModeContext)
	const history = useNavigate()
	const { title, message, name, tags, thumbnail, likes, createdAt, _id } = post
	const hasLikedPost = likes.find((like) => like === userId)
	const Likes = () => {
		const textColor = mode === 'dark' ? 'white' : '#000000';
		if (likes.length > 0)
			return hasLikedPost ? (
				<Typography variant="body2" sx={{ align: 'center', display: 'flex' }}>
					<ThumbUpAlt fontSize="small" />
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
	return (
		<Root className={classes.root}>
			<Card raised className={classes.postCard}>
				<ButtonBase className={classes.buttonBase} onClick={() => history(`/posts/${_id}`)} component="span">
					<CardMedia className={classes.cardMedia} component="img" image={thumbnail} />
					<div className={classes.cardContent}>
						<div className={classes.overlay}>
							<Typography variant="h6">{name}</Typography>
							<Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
						</div>
						<CardContent sx={{ alignSelf: 'flex-start' }}>
							<Typography variant="body2" color="text.secondary" component="p" style={{ textOverflow: 'ellipsis' }}>
								{tags
									.map((tag) => `#${tag} `)
									.join(' ')
									.slice(0, 50)}
							</Typography>
						</CardContent>
						<div style={{ textAlign: 'center' }} >
							<Typography variant="h5" gutterBottom className={`${mode === 'dark' ? classes.darkModeText : ''}`}>
								{title.slice(0, 25)}
							</Typography>
							<Button sx={{ display: post.private ? 'initial' : 'none', paddingBottom: 0 }} variant="contained" size="small" disableElevation>
								<Lock />
							</Button>
							<CardContent>
								<Typography variant="body2" color="text.secondary" component="p" sx={{ wordWrap: 'break-word' }} className={`${mode === 'dark' ? classes.darkModeText : ''}`}>
									{`${message.slice(0, 100)} ${message.length > 100 ? '...' : ''}`}
								</Typography>
							</CardContent>
						</div>
						<CardActions className={classes.cardActions}>
							<Button size="small" color="success">
								<Likes />
							</Button>
						</CardActions>
					</div>
				</ButtonBase>
			</Card>
		</Root>
	)
}

export default PostCard
