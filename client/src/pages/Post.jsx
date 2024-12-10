import {
	Avatar,
	AvatarGroup,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
	ClickAwayListener,
	Container,
	Divider,
	Grid2 as Grid,
	Stack,
	Tooltip,
	Typography
} from '@mui/material'
import { CommentSection, RecommendationSection } from '@/sections'
import { Link, useNavigate, useParams } from 'react-router'
import {
	AvatarGroupSkeleton,
	UserListPopover,
	UserListDrawer,
	PostSkeleton,
	ReactButton,
	ShareButton,
	UserAvatar
} from '@/components'
import { useGetPost, useGetTop3Reacts } from '@/hooks'
import moment from 'moment'
import { useState } from 'react'

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

const PostCard = ({ post, isLoading, error }) => {
	const navigate = useNavigate()

	if (isLoading) {
		return <PostSkeleton />
	}
	const author = { ...post.author, id: post.authorId }
	if (error?.message === 'API Error: Post not found') {
		navigate('/not-found')
	}
	document.title = `Memories | ${post.title}`
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
				<Stack direction="row" flexWrap="wrap" mb={2} gap={1}>
					{post.tags.map((tag) => (
						<Chip
							key={tag}
							label={tag}
							component={Link}
							to={`/hashtag/${tag}`}
							onClick={(e) => e.stopPropagation()}
							sx={{ textDecoration: 'none' }}
						/>
					))}
				</Stack>
				<Typography variant="body1" component="p" whiteSpace="pre-line">
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
	const { data: reactors, isFetching } = useGetTop3Reacts(post.id)
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = (event) => {
		setIsOpen(!isOpen)
	}

	const handleClose = () => setIsOpen(false)

	if (isFetching) {
		return <AvatarGroupSkeleton />
	}

	return (
		<Stack>
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
				renderSurplus={() => (
					<Tooltip title="Click to view all reactions" arrow>
						<Avatar
							sx={{ cursor: 'pointer' }}
							onClick={handleClick}
						>
							+{post.reactionCount - 3}
						</Avatar>
					</Tooltip>
				)}
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
			<UserListDrawer
				id={post.id}
				open={isOpen}
				onClose={handleClose}
				total={post.reactionCount}
			/>
		</Stack>
	)
}

const Post = () => {
	const { id } = useParams()
	const { data: post, isLoading, error } = useGetPost(id)

	return (
		<Container sx={{ py: { xs: 2, md: 4 }, mb: 10 }} maxWidth="xl">
			<Grid container spacing={3}>
				<PostCard post={post} isLoading={isLoading} error={error} />
				<CommentSection postId={id} />
				<RecommendationSection />
			</Grid>
		</Container>
	)
}

export default Post
