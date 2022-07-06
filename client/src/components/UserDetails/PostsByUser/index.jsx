import { Root, classes } from './styles'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, Typography, CircularProgress, Divider, Button, Grid, Avatar } from '@mui/material'
import { getPostsByUser } from '../../../actions/posts'
import Post from '../../Posts/Post/Post'

const PostsByUser = ({ user }) => {
	const { post, posts, isLoading } = useSelector((state) => state.posts)

	const dispatch = useDispatch()
	useEffect(() => {
		if (user) dispatch(getPostsByUser(user.result._id, 'Created'))
	}, [dispatch, user, posts])

	if (!posts.length && !isLoading) return 'No Posts'
	return (
		<Root>
			<Paper className={classes.loadingPaper} elevation={6}>
				<Typography gutterBottom variant="h5">
					Posts By User:
				</Typography>
				<Grid className={classes.container} container alignItems="stretch" spacing={3}>
					{posts.map((post) => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={2}>
							<Post post={post} setCurrentId={0} user={user} />
						</Grid>
					))}
				</Grid>
			</Paper>
		</Root>
	)
}

export default PostsByUser
