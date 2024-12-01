import {
	Avatar,
	AvatarGroup,
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
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
	PostSkeleton,
	ReactButton,
	ShareButton,
	UserAvatar
} from '@/components'
import { useGetPost, useGetTop3Reacts } from '@/hooks'
import moment from 'moment'
import { Helmet } from 'react-helmet-async'

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
					{post.tags.map((tag) => (
						<Chip key={tag} label={tag} sx={{ mr: 1 }} />
					))}
				</Box>
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

const MetaData = ({ post }) => {
	const { title, description, imageUrl, author, createdAt } = post
	const image =
		'https://opengraph.b-cdn.net/production/images/bb42e86a-ba5f-42e6-8583-0acba8dc7d5a.jpg?token=BxBX20pTwR13SAgcvEZVW5UtcWa5dIWkAc8dylMUDwU&height=675&width=1200&expires=33269064669'
	const url = `${window.location.origin}/post/${post.id}`
	const formattedDescription =
		description.length > 160
			? `${description.substring(0, 157)}...`
			: description
	return (
		<Helmet>
			{/* Basic Meta Tags */}
			<title>{`Memories | ${title}`}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={url} />

			{/* OpenGraph Meta Tags */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={formattedDescription} />
			<meta property="og:image" content={image} />
			<meta property="og:url" content={url} />
			<meta property="og:type" content="article" />
			<meta property="article:published_time" content={createdAt} />
			<meta property="article:author" content={author.fullName} />
			<meta
				property="article:section"
				content={post.tags[0] || 'General'}
			/>
			{post.tags.map((tag) => (
				<meta key={tag} property="article:tag" content={tag} />
			))}

			{/* Twitter Card Meta Tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={formattedDescription} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:url" content={url} />
		</Helmet>
	)
}

const Post = () => {
	const { id } = useParams()
	const { data: post, isLoading, error } = useGetPost(id)
	if (isLoading) {
		return <PostSkeleton />
	}
	return (
		<Container sx={{ py: { xs: 2, md: 4 }, mb: 10 }} maxWidth="xl">
			<MetaData post={post} />
			<Grid container spacing={3}>
				<PostCard post={post} isLoading={isLoading} error={error} />
				<CommentSection postId={id} />
				<RecommendationSection />
			</Grid>
		</Container>
	)
}

export default Post
