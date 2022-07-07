import { useEffect, useState } from 'react'
import { Root, classes } from './styles'
import { Paper, Typography, Grid, Pagination, Skeleton } from '@mui/material'
import { LoadingCard, PostCard } from '../Cards'
import { getPostsByUser } from '../../../actions/posts'
import { useSelector, useDispatch } from 'react-redux'
import { posts } from '../testPosts'

const PostsLikedByUser = ({ user }) => {
	const data = user // Fetch UserData
	const isLoading = false
	const [progress, setProgress] = useState(0)
	const dispatch = useDispatch()
	// const { stuff } = useSelector((state) => {})
	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 90 ? (isLoading ? 90 : 100) : prevProgress + 10))
		}, 300)
		return () => {
			clearInterval(timer)
		}
	}, [isLoading])

	return (
		<Root>
			<Paper className={classes.loadingPaper} elevation={6}>
				<Typography gutterBottom variant="h5">
					Posts Liked By User:
				</Typography>
				<Grid className={classes.container} container spacing={3}>
					{progress < 100 || isLoading ? [...Array(10).keys()].map((key) => <LoadingCard key={key} />) : posts.map((post, key) => <PostCard key={key} post={post} />)}
					{progress < 100 || isLoading ? <Skeleton height={30} width={310} animation="pulse" variant="rectangular" /> : <Pagination count={10} color="primary" />}
				</Grid>
			</Paper>
		</Root>
	)
}

export default PostsLikedByUser

//* BACKEND LOGIC
// // const { post, posts, isLoading } = useSelector((state) => state.posts)
// const data = useSelector((state) => state.posts)
// console.log(data)
// const dispatch = useDispatch()
// useEffect(() => {
// 	if (user) dispatch(getPostsByUser(user.result._id, 'Liked'))
// }, [dispatch, user, posts])

// return (
// 	<Root>
// 		<Paper className={classes.loadingPaper} elevation={6}>
// 			<Typography gutterBottom variant="h5">
// 				Posts Liked By User:
// 			</Typography>
// 			<Grid className={classes.container} container alignItems="stretch" spacing={3}>
// 				{posts
// 					.filter(({ likes }) => likes.includes(user.result._id))
// 					.map((post) => (
// 						<Grid key={post._id} item xs={12} sm={12} md={6} lg={2}>
// 							<Post post={post} setCurrentId={0} user={user} />
// 						</Grid>
// 					))}
// 			</Grid>
// 		</Paper>
// 	</Root>
// )
