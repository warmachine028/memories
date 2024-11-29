import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid2 as Grid,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	Typography
} from '@mui/material'
import { CommentSection, RecommendationSection } from '@/sections'
import {
	ContentCopy,
	Facebook,
	LinkedIn,
	Share,
	X,
	WhatsApp
} from '@mui/icons-material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
	AvatarGroupSkeleton,
	PostSkeleton,
	ReactButton,
	ShareButton,
	UserAvatar
} from '@/components'
import { useGetPost, useGetTop3Reacts } from '@/hooks'
import moment from 'moment'
import { useState } from 'react'
import { useStore } from '@/store'

const PostMetaData = ({ author, timestamp }) => {
	const navigate = useNavigate()

	return (
		<Stack direction="row" spacing={2} alignItems="center">
			<UserAvatar
				onClick={() => navigate(`/user/${author.id}`)}
				user={author}
				size={70}
			/>
			<Stack>
				<Typography variant="h6">{author.fullName}</Typography>
				<Typography
					component={Link}
					variant="body2"
					color="textSecondary"
					to={`mailto:${author.email}`}
					sx={{ textDecoration: 'none' }}
				>
					{author.email}
				</Typography>
				<Typography variant="caption" color="textSecondary">
					{moment(timestamp).fromNow()}
				</Typography>
			</Stack>
		</Stack>
	)
}

const PostCard = () => {
	const { id } = useParams()
	const { data: post, isLoading, error } = useGetPost(id)
	const navigate = useNavigate()
	const [shareDialogOpen, setShareDialogOpen] = useState(false)
	const handleShareClick = () => setShareDialogOpen(true)

	if (isLoading) {
		return <PostSkeleton />
	}
	const author = { ...post.author, id: post.authorId }
	if (error?.message === 'API Error: Post not found') {
		navigate('/not-found')
	}
	return (
		<Card sx={{ width: 1 }}>
			<CardMedia component="img" image={post.imageUrl} alt="Post cover" />
			<CardHeader
				avatar={
					<PostMetaData author={author} timestamp={post.createdAt} />
				}
			/>
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
				<ReactButton post={post} />
				<ShareButton url={window.location.href} />
				<Stack
					direction="row"
					alignItems="center"
					spacing={1}
					flexGrow={1}
					justifyContent="flex-end"
				>
					<Top3Reactions post={post} />
				</Stack>
			</CardActions>
		</Card>
	)
}

const Top3Reactions = ({ post }) => {
	const { data: reactors, isLoading } = useGetTop3Reacts(post.id)

	if (isLoading) {
		return <AvatarGroupSkeleton />
	}

	return (
		<AvatarGroup
			max={4}
			sx={{
				'& .MuiAvatar-root': {
					width: 40,
					height: 40,
					fontSize: '1rem'
				}
			}}
			total={post.reactionCount}
		>
			{reactors.map(({ user: reactor }) => (
				<Tooltip key={reactor.id} title={reactor.fullName} arrow>
					<Avatar
						component={Link}
						to={`/user/${reactor.id}`}
						alt={reactor.fullName}
						src={reactor.imageUrl}
						sx={{
							transition: 'transform 0.2s, z-index 0.2s',
							'&:hover': {
								transform: 'scale(1.2)',
								zIndex: 10
							}
						}}
					/>
				</Tooltip>
			))}
		</AvatarGroup>
	)
}

const ShareDialog = ({ open, onClose, url }) => {
	const shareUrls = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
		whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
	}
	const { openSnackbar } = useStore()
	const handleCopy = () =>
		navigator.clipboard.writeText(url).then(() => {
			openSnackbar('Link copied to clipboard', 'info')
		})

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="share-dialog-title"
			fullWidth
			PaperProps={{ elevation: 0 }}
		>
			<DialogTitle id="share-dialog-title">Share this post</DialogTitle>
			<DialogContent>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="center"
					mb={1}
				>
					<IconButton
						onClick={() =>
							window.open(shareUrls.facebook, '_blank')
						}
						aria-label="Share on Facebook"
					>
						<Facebook color="primary" />
					</IconButton>
					<IconButton
						onClick={() => window.open(shareUrls.twitter, '_blank')}
						aria-label="Share on Twitter"
					>
						<X />
					</IconButton>
					<IconButton
						onClick={() =>
							window.open(shareUrls.linkedin, '_blank')
						}
						aria-label="Share on LinkedIn"
					>
						<LinkedIn color="info" />
					</IconButton>
					<IconButton
						onClick={() =>
							window.open(shareUrls.whatsapp, '_blank')
						}
						aria-label="Share on WhatsApp"
					>
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
								<IconButton
									onClick={handleCopy}
									aria-label="Copy link"
								>
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
