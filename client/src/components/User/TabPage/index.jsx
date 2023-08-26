import { Root, classes } from './styles'
import { Typography, Grid, Pagination, Skeleton, Grow, Avatar } from '@mui/material'
import { LoadingCard, PostCard } from '../Cards'
import { Link } from 'react-router-dom'
import Avaatar from 'avataaars'
import moment from 'moment'

// import { posts } from '../../../temp'
// const isLoading = false
// const numberOfPages = 10

const Comment = (props) => {
	// userId = userId ? userId.padStart(24, '0') : userId
	const { creator, message, createdAt, post } = props

	return (
		<Grow in mountOnEnter unmountOnExit>
			<div className={classes.commentContainer} to={`/posts/${post}`}>
				<Grid item className={classes.commentBox} xl>
					<Link to={`/posts/${post}`}>
						<img src="https://source.unsplash.com/random/?city,night/1920x1080" alt="random" height={90} width={130} style={{ borderRadius: 5 }} />
					</Link>
					<div className={classes.commentItem}>
						<Typography className={classes.userName}>Post Title </Typography>
						<Typography className={classes.time}>{moment(createdAt).fromNow()}</Typography>
						<Typography className={classes.comment} component="p">
							{message}
						</Typography>
					</div>
				</Grid>
			</div>
		</Grow>
	)
}

const TabPage = (props) => {
	const { posts, numberOfPages, isLoading, notDoneText, page, setPage, userId, comments } = props

	return (
		<Root className={classes.root}>
			<div className={classes.tab}>
				<div style={{ width: '100%' }}>
					{isLoading ? (
						<Grid className={classes.container} container spacing={3}>
							{posts ? [...Array(10).keys()].map((key) => <LoadingCard key={key} />) : [...Arrays(2).keys()].map((key) => <LoadingCard key={key} />)}
						</Grid>
					) : posts?.length ? (
						<Grid className={classes.container} container spacing={3}>
							{posts.map((post) => (
								<PostCard key={post._id} post={post} userId={userId} />
							))}
						</Grid>
					) : comments?.length ? (
						<Grid className={classes.container} container spacing={3}>
							{comments.map((comment) => (
								<Comment key={comment._id} {...comment} />
							))}
						</Grid>
					) : (
						<Typography gutterBottom variant="h6" className={classes.noPostsLiked}>
							{notDoneText}
						</Typography>
					)}
				</div>
				{isLoading ? <Skeleton height={30} width={310} animation="pulse" variant="rectangular" /> : <Pagination count={numberOfPages || 0} color="primary" page={page} onChange={(_, page) => setPage(page)} />}
			</div>
		</Root>
	)
}

export default TabPage
