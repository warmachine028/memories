import { AvatarGroup, Button, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField, Tooltip } from '@mui/material'
import { CommentSection, RecommendationSection } from '@/sections'
import { ContentCopy, EmojiEmotionsOutlined, Facebook, FavoriteBorder, FavoriteOutlined, LinkedIn, MoodOutlined, SentimentDissatisfiedOutlined, SentimentVeryDissatisfiedOutlined, Share, ThumbUpOutlined, Twitter, WhatsApp, X } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Chip, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PostSkeleton } from '@/components'
import { useGetPost } from '@/hooks'
import moment from 'moment'
import { useState } from 'react'

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

const users = [
	{ id: 1, name: 'John Doe', avatar: 'https://picsum.photos/seed/1/200' },
	{ id: 2, name: 'Jane Smith', avatar: 'https://picsum.photos/seed/2/200' },
	{ id: 3, name: 'Bob Johnson', avatar: 'https://picsum.photos/seed/3/200' },
	{ id: 4, name: 'Alice Brown', avatar: 'https://picsum.photos/seed/4/200' },
	{ id: 5, name: 'Charlie Davis', avatar: 'https://picsum.photos/seed/5/200' },
	{ id: 6, name: 'Eva Wilson', avatar: 'https://picsum.photos/seed/6/200' }
]

const PostCard = () => {
	const { id } = useParams()
	const { data: post } = useGetPost(id)
	const [shareDialogOpen, setShareDialogOpen] = useState(false)
	const handleShareClick = () => {
		setShareDialogOpen(true)
	}

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
				<Typography variant="h4" gutterBottom fontWeight="bold">
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
				<IconButton color="primary">
					<FavoriteOutlined color="error" />
				</IconButton>
				<IconButton onClick={handleShareClick} color="primary">
					<Share />
				</IconButton>

				<Stack direction="row" alignItems="center" spacing={1} flexGrow={1} justifyContent="flex-end">
					<AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 40, height: 40, fontSize: '1rem' } }}>
						{users.map((user) => (
							<Tooltip key={user.id} title={user.name} arrow>
								<Avatar
									//
									alt={user.name}
									src={user.avatar}
									sx={{ transition: 'transform 0.2s, z-index 0.2s', '&:hover': { transform: 'scale(1.2)', zIndex: 10 } }}
								/>
							</Tooltip>
						))}
					</AvatarGroup>
				</Stack>
			</CardActions>
			<ShareDialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} url={window.location.href} />
		</Card>
	)
}
const ShareDialog = ({ open, onClose, url }) => {
	const handleCopy = () => navigator.clipboard.writeText(url).then(() => {})
	const navigate = useNavigate()
	const shareUrls = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
		whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
	}

	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="share-dialog-title" fullWidth PaperProps={{ elevation: 1 }}>
			<DialogTitle id="share-dialog-title">Share this post</DialogTitle>
			<DialogContent>
				<Stack direction="row" spacing={2}>
					<IconButton onClick={() => window.open(shareUrls.facebook, '_blank')} aria-label="Share on Facebook">
						<Facebook color="primary" />
					</IconButton>
					<IconButton onClick={() => window.open(shareUrls.twitter, '_blank')} aria-label="Share on Twitter">
						<X />
					</IconButton>
					<IconButton onClick={() => window.open(shareUrls.linkedin, '_blank')} aria-label="Share on LinkedIn">
						<LinkedIn color="info" />
					</IconButton>
					<IconButton onClick={() => window.open(shareUrls.whatsapp, '_blank')} aria-label="Share on WhatsApp">
						<WhatsApp color="success" />
					</IconButton>
				</Stack>
				<TextField
					fullWidth
					value={url}
					slotProps={{
						input: {
							readOnly: true,
							endAdornment: (
								<IconButton onClick={handleCopy} aria-label="Copy link">
									<ContentCopy />
								</IconButton>
							)
						}
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
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
