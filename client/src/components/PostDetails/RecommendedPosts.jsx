import { Paper, Typography, Pagination, Grid, Skeleton } from '@mui/material'
import { Root, classes } from './styles'
import { PostCard, LoadingCard } from '../User/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecommendedPosts } from '../../actions/posts'
// import dispatch

import { posts, isLoading } from '../../temp'
// const post = posts[0]

const RecommendedPosts = ({ user, tags, post_id }) => {
	const dispatch = useDispatch()
	const userId = user?.result.googleId || user?.result._id
	useEffect(() => dispatch(getRecommendedPosts(tags.join(','))), [tags])
	const { recommendedPosts, isFetchingRecommendedPosts: isLoading } = useSelector((state) => state.posts)

	const posts = recommendedPosts?.filter(({ _id }) => _id !== post_id)
	return (
		<Root className={classes.root} sx={{ width: '100%' }}>
			<Typography variant="h5" styles={{ textAlign: 'left' }}>
				You might also like:
			</Typography>
			<div className={classes.recommendedPosts}>
				<div style={{ width: '100%' }}>
					{!isLoading && !posts.length ? (
						<Typography
							gutterBottom
							variant="h6"
							style={{
								justifyContent: 'space-around',
								flexDirection: 'row',
								display: 'flex',
								alignItems: 'center',
								color: 'white',
								width: '100%',
							}}
						>
							No posts found with these tags
						</Typography>
					) : (
						<Grid
							sx={{
								justifyContent: 'space-around',
								marginTop: 5,
								marginLeft: 0,
								flexDirection: 'row',
								width: '100%',
							}}
							container
							spacing={3}
						>
							{isLoading ? [...Array(10).keys()].map((key) => <LoadingCard key={key} />) : posts.map((post, key) => <PostCard key={key} post={post} userId={userId} />)}
						</Grid>
					)}
				</div>
				{/* {isLoading ? <Skeleton height={30} width={310} animation="pulse" variant="rectangular" /> : <Pagination count={numberOfPages || 0} color="primary" page={page} onChange={(_, page) => setPage(page)} />} */}
			</div>
		</Root>
	)
}

export default RecommendedPosts
