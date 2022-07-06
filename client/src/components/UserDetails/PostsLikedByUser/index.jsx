import { useEffect } from 'react'
import { Root, classes } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, Typography, CircularProgress, Divider, Button, Grid, Avatar } from '@mui/material'
import { getPostsByUser } from '../../../actions/posts'
import Post from '../../Posts/Post/Post'

const PostsLikedByUser = ({ user }) => {
	// const { post, posts, isLoading } = useSelector((state) => state.posts)
	const data = useSelector((state) => state.posts)
	console.log(data)
	return <div>TEXT</div>
	const dispatch = useDispatch()
	useEffect(() => {
		if (user) dispatch(getPostsByUser(user.result._id, 'Liked'))
	}, [dispatch, user, posts])
	
	return (
		<Root>
			<Paper className={classes.loadingPaper} elevation={6}>
				<Typography gutterBottom variant="h5">
					Posts Liked By User:
				</Typography>
				<Grid className={classes.container} container alignItems="stretch" spacing={3}>
					{posts
						.filter(({ likes }) => likes.includes(user.result._id))
						.map((post) => (
							<Grid key={post._id} item xs={12} sm={12} md={6} lg={2}>
								<Post post={post} setCurrentId={0} user={user} />
							</Grid>
						))}
				</Grid>
			</Paper>
		</Root>
	)
}

export default PostsLikedByUser
