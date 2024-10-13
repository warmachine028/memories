import React from 'react'
import { AddReactionSharp, Comment, Share } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, IconButton, Stack, Typography } from '@mui/material'
import moment from 'moment'

const AuthorInfo = ({ avatarUrl, name, email, timestamp }) => (
	<Box display="flex" alignItems="center" mb={2}>
		<Avatar src={avatarUrl} alt={name} sx={{ width: 60, height: 60, mr: 2 }} />
		<Box>
			<Typography variant="h6">{name}</Typography>
			<Typography variant="body2" color="textSecondary">
				{email}
			</Typography>
			<Typography variant="caption" color="textSecondary">
				{moment(timestamp).fromNow()}
			</Typography>
		</Box>
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
	return (
		<Card elevation={3}>
			<CardMedia component="img" height="400" image="https://picsum.photos/800/400" alt="Post cover" />
			<Stack divider={<Divider sx={{ my: 2 }} />}>
				<CardHeader avatar={<AuthorInfo avatarUrl="https://picsum.photos/100" name="Saul Goodman" email="saul@goodmanlaw.com" timestamp={Date.now()} />} />
				<CardContent>
					<Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
						The Art of Crafting Compelling Blog Posts
					</Typography>
					<Box mb={2}>
						<Chip label="Writing" sx={{ mr: 1 }} />
						<Chip label="Blogging" sx={{ mr: 1 }} />
						<Chip label="Content Creation" />
					</Box>
					<Typography variant="body1" component="p">
						In the digital age, where information is abundant and attention spans are short, the art of crafting compelling blog posts has become more crucial than ever. A well-written blog post can engage readers, spark conversations, and even influence decisions. But what makes a blog post truly compelling?
					</Typography>
				</CardContent>
				<CardActions>
					<PostActions shareCount={42} commentCount={18} likeCount={105} />
				</CardActions>
			</Stack>
		</Card>
	)
}

export default Post
