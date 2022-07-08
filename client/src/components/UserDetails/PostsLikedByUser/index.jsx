import { useEffect, useState } from 'react'
import { Root, classes } from './styles'
import { Paper, Typography, Grid, Pagination, Skeleton } from '@mui/material'
import { LoadingCard, PostCard } from '../Cards'
import { getPostsLiked } from '../../../actions/posts'
import { useSelector, useDispatch } from 'react-redux'

// import { posts } from '../testPosts'
// const isLoading = false
// const numberOfPages = 10

const PostsLikedByUser = ({ user }) => {
	const { likedPosts: posts, numberOfPages, isFetchingLikedPosts: isLoading } = useSelector((state) => state.posts) // Fetch UserData
	const [page, setPage] = useState(1)
	
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPostsLiked(user.result._id || user.result.googleId, page))
	}, [page])

	return (
		<Root className={classes.root}>
			<Paper className={classes.loadingPaper} elevation={6}>
				<div style={{ width: '100%' }}>
					<Typography gutterBottom variant="h5">
						Posts Liked By User:
					</Typography>
					{!isLoading && !posts.length ? (
						<Typography gutterBottom variant="h6" className={classes.noPostsLiked}>
							No Posts Liked
						</Typography>
					) : (
						<Grid className={classes.container} container spacing={3}>
							{isLoading ? [...Array(10).keys()].map((key) => <LoadingCard key={key} />) : posts.map((post, key) => <PostCard key={key} post={post} />)}
						</Grid>
					)}
				</div>
				{isLoading ? <Skeleton height={30} width={310} animation="pulse" variant="rectangular" /> : <Pagination count={numberOfPages || 0} color="primary" page={page} onChange={(_, page) => setPage(page)} />}
			</Paper>
		</Root>
	)
}

export default PostsLikedByUser
