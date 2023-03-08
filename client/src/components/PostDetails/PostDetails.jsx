import moment from 'moment'
import CommentSection from './CommentSection'
import RecommendedPosts from './RecommendedPosts'
import { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Root, classes } from './styles'
import { getPost } from '../../actions/posts'
// import { posts, isLoading } from '../../temp'
// const post = posts[0]

const PostDetails = ({ user }) => {
	const { id } = useParams()
	const dispatch = useDispatch()
	useEffect(() => dispatch(getPost(id)), [id])

	const { post, isLoading } = useSelector((state) => state.posts)

	return isLoading || !post ? (
		<Root className={classes.root}>
			<Paper className={classes.loadingPaper} style={{ alignItems: 'center' }} elevation={6}>
				<CircularProgress size="7em" />
			</Paper>
		</Root>
	) : (
		<Root className={classes.root}>
			<Paper className={classes.loadingPaper} elevation={6}>
				<div className={classes.card}>
					<div className={classes.section}>
						<div className={classes.imageSection}>
							<img className={classes.media} src={post.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
						</div>
						<Typography variant="h3" className={classes.title}>
							{post.title}
						</Typography>
						<Typography gutterBottom variant="h6" color="textSecondary" component="h2" className={classes.tags}>
							{post.tags.map((tag) => `#${tag} `)}
						</Typography>
						<div style={{ margin: '0 0 20px 0', display: post.private ? 'block' : 'none' }} align="center">
							<Button className={classes.privateLabel} variant="contained" size="small" disableElevation>
								PRIVATE
							</Button>
						</div>
						<Typography className={classes.paragraph} gutterBottom variant="body1" component="p">
							{post.message}
						</Typography>
						<Typography variant="h6">Created by: {post.creator.name}</Typography>
						<Typography variant="body1">{moment(post.createdAt).format('Do MMMM YYYY, dddd, h:mm A')}</Typography>
						<Divider style={{ margin: '20px 0' }} />
						{/* <CommentSection post={post} user={user} /> */}
					</div>
				</div>
			</Paper>
			<Paper className={classes.loadingPaper} elevation={6} sx={{ marginTop: 1 }}>
				<RecommendedPosts tags={post.tags} user={user} post_id={post._id} />
			</Paper>
		</Root>
	)
}

export default PostDetails
