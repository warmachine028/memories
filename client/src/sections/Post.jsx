import React, { useEffect } from 'react'
import { AddReactionSharp, Comment, Share } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, IconButton, Stack, Typography } from '@mui/material'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '@/reducers/post'
import { PostSkeleton } from '@/components'

const AuthorInfo = ({ avatarUrl, name, email, timestamp, id }) => (
	<Box display="flex" alignItems="center" mb={2}>
		<Avatar src={avatarUrl} alt={name} sx={{ width: 60, height: 60, mr: 2 }} component={Link} to={`/user/${id}`} />
		<Stack>
			<Typography variant="h6">{name}</Typography>
			<Typography component={Link} variant="body2" color="textSecondary" to={`mailto:${email}`} sx={{ textDecoration: 'none' }}>
				{email}
			</Typography>
			<Typography variant="caption" color="textSecondary">
				{moment(timestamp).fromNow()}
			</Typography>
		</Stack>
	</Box>
)

const PostActions = ({ shareCount, commentCount, likeCount }) => {
	return (
		<Stack direction="row" justifyContent="space-between" mt={2}>
			<IconButton color="primary" disableRipple>
				<Share />
				<Typography variant="body2" ml={1}>
					{shareCount}
				</Typography>
			</IconButton>
			<IconButton color="success" disableRipple>
				<Comment />
				<Typography variant="body2" ml={1}>
					{commentCount}
				</Typography>
			</IconButton>
			<IconButton color="info" disableRipple>
				<AddReactionSharp />
				<Typography variant="body2" ml={1}>
					{likeCount}
				</Typography>
			</IconButton>
		</Stack>
	)
}

const Post = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { post } = useSelector((state) => state.posts)
	const { user } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(getPost(id))
	}, [dispatch, id])

	if (!post) {
		return <PostSkeleton />
	}
	return (
		<Card elevation={3}>
			<CardMedia component="img" height="400" image={post.imageUrl} alt="Post cover" />
			<Stack divider={<Divider sx={{ my: 2 }} />}>
				<CardHeader
					avatar={
						<AuthorInfo //
							avatarUrl={user.image}
							id={user.id}
							name={user.name}
							email={user.email}
							timestamp={Date.now()}
						/>
					}
				/>
				<CardContent>
					<Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
						{post.title}
					</Typography>
					<Box mb={2}>
						{post.tags.map((tag) => (
							<Chip key={tag} label={tag} sx={{ mr: 1 }} />
						))}
					</Box>
					<Typography variant="body1" component="p">
						{post.body}
					</Typography>
				</CardContent>
				<CardActions>
					<PostActions shareCount={post.reactions.dislikes} commentCount={post.reactions.dislikes - 10} likeCount={post.reactions.likes} />
				</CardActions>
			</Stack>
		</Card>
	)
}

export default Post
