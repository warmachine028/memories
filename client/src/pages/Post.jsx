import { CardMedia, Container, Grid2 as Grid } from '@mui/material'
import { CommentSection, RecommendationSection } from '@/sections'
import { EmojiEmotionsOutlined, FavoriteBorder, MoodOutlined, SentimentDissatisfiedOutlined, SentimentVeryDissatisfiedOutlined, ThumbUpOutlined } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Chip, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { PostSkeleton } from '@/components'
import { useGetPost } from '@/hooks'
import moment from 'moment'

const AuthorInfo = ({ author, timestamp }) => (
	<Stack direction="row">
		<Avatar src={author.imageUrl} alt={author.fullName} sx={{ width: 60, height: 60, mr: 2 }} component={Link} to={`/user/${author.id}`} />
		<Stack>
			<Typography variant="h6">{author.fullName}</Typography>
			<Typography component={Link} variant="body2" color="textSecondary" to={`mailto:${author.email}`} sx={{ textDecoration: 'none' }}>
				{author.email}
			</Typography>
			<Typography variant="caption" color="textSecondary">
				{moment(timestamp).fromNow()}
			</Typography>
		</Stack>
	</Stack>
)

const PostCard = () => {
	const { id } = useParams()
	const { data: post } = useGetPost(id)

	if (!post) {
		return <PostSkeleton />
	}
	const reactions = {
		like: post.reactions.filter((r) => r.reactionType === 'LIKE').length,
		love: post.reactions.filter((r) => r.reactionType === 'LOVE').length,
		haha: post.reactions.filter((r) => r.reactionType === 'HAHA').length,
		sad: post.reactions.filter((r) => r.reactionType === 'SAD').length,
		wow: post.reactions.filter((r) => r.reactionType === 'WOW').length,
		angry: post.reactions.filter((r) => r.reactionType === 'ANGRY').length
	}
	return (
		<Card elevation={3}>
			<CardMedia component="img" image={post.imageUrl} alt="Post cover" />

			<CardHeader avatar={<AuthorInfo author={post.author} timestamp={post.createdAt} />} />
			<Divider />
			<CardContent>
				<Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
					{post.title}
				</Typography>
				<Box mb={2}>
					{post.tags.map(({ tag: { name } }) => (
						<Chip key={name} label={name} sx={{ mr: 1 }} />
					))}
				</Box>
				<Typography variant="body1" component="p">
					{post.description}
				</Typography>
			</CardContent>
			<Divider />
			<CardActions>
				<IconButton>
					<ThumbUpOutlined sx={{ color: '#2196f3', mr: 1 }} />
					<Typography variant="body2" color="textSecondary">
						{reactions.like}
					</Typography>
				</IconButton>
				<IconButton>
					<FavoriteBorder sx={{ color: '#e91e63', mr: 1 }} />
					<Typography variant="body2" color="textSecondary">
						{reactions.love}
					</Typography>
				</IconButton>
				<IconButton>
					<EmojiEmotionsOutlined sx={{ color: '#ffc107', mr: 1 }} />
					<Typography variant="body2" color="textSecondary">
						{reactions.haha}
					</Typography>
				</IconButton>
				<IconButton>
					<SentimentVeryDissatisfiedOutlined sx={{ color: '#607d8b', mr: 1 }} />
					<Typography variant="body2" color="textSecondary">
						{reactions.sad}
					</Typography>
				</IconButton>
				<IconButton>
					<MoodOutlined sx={{ color: '#4caf50', mr: 1 }} />
					<Typography variant="body2" color="textSecondary">
						{reactions.wow}
					</Typography>
				</IconButton>
				<IconButton>
					<SentimentDissatisfiedOutlined sx={{ color: '#ff5722', mr: 1 }} />
					<Typography variant="body2" color="textSecondary">
						{reactions.angry}
					</Typography>
				</IconButton>
			</CardActions>
		</Card>
	)
}

const Post = () => {
	return (
		<Container sx={{ py: { xs: 2, md: 4 }, mb: 10 }} maxWidth="xl">
			<Grid container spacing={3}>
				<PostCard />
				<CommentSection />
				<RecommendationSection />
			</Grid>
		</Container>
	)
}

export default Post
