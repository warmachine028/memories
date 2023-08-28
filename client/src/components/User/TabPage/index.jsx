import { Root, classes } from './styles'
import { Typography, Grid, Pagination, Skeleton } from '@mui/material'
import { LoadingCard, PostCard, CommentCard, CommentLoadingCard } from '../Cards'

const TabPage = (props) => {
	const { posts, numberOfPages, isLoading, notDoneText, page, setPage, userId, comments } = props

	return (
		<Root className={classes.root}>
			<div className={classes.tab}>
				<div style={{ width: '100%' }}>
					{isLoading ? (
						<Grid className={classes.container} container spacing={3}>
							{posts ? [...Array(10).keys()].map((key) => <LoadingCard key={key} />) : [...Array(2).keys()].map((key) => <CommentLoadingCard key={key} />)}
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
								<CommentCard key={comment._id} {...comment} />
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
