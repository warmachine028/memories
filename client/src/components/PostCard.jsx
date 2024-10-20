import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Button, Popover, Paper, CardActionArea, Stack, Box, Fade, CircularProgress } from '@mui/material'
import { ThumbUp, Delete, Favorite, EmojiEmotions, SentimentVeryDissatisfied, Mood, SentimentDissatisfied, ThumbUpOutlined, Edit } from '@mui/icons-material'
import { UserAvatar } from '.'
import moment from 'moment'
import { getThumbnail } from '@/lib/utils'
import { useUser } from '@clerk/clerk-react'
import { useDeletePost } from '@/hooks'

const reactions = [
	{ icon: ThumbUp, label: 'Like', color: '#2196f3' },
	{ icon: Favorite, label: 'Love', color: '#e91e63' },
	{ icon: EmojiEmotions, label: 'Haha', color: '#ffc107' },
	{ icon: SentimentVeryDissatisfied, label: 'Sad', color: '#607d8b' },
	{ icon: Mood, label: 'Wow', color: '#4caf50' },
	{ icon: SentimentDissatisfied, label: 'Angry', color: '#ff5722' }
]

const TruncatedText = ({ children: text, maxLength, ...props }) => {
	const truncated = text.length > maxLength ? text.slice(maxLength) : text
	return (
		<Typography
			sx={{
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				display: '-webkit-box',
				WebkitLineClamp: maxLength === 100 ? 2 : 1,
				WebkitBoxOrient: 'vertical'
			}}
			{...props}
		>
			{truncated}
		</Typography>
	)
}

const PostCard = ({ post }) => {
	const { user } = useUser()
	const { mutate: deletePost, isPending } = useDeletePost()
	const [reactionAnchorEl, setReactionAnchorEl] = useState(null)
	const [currentReaction, setCurrentReaction] = useState(post.reactions[0]?.reactionType)

	const popoverTimeoutRef = useRef(null)
	const navigate = useNavigate()

	const handleReactionIconEnter = (event) => {
		clearTimeout(popoverTimeoutRef.current)
		setReactionAnchorEl(event.currentTarget)
	}

	const handleReactionIconLeave = () => {
		popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 1000)
	}

	const handlePopoverEnter = () => {
		clearTimeout(popoverTimeoutRef.current)
	}

	const handlePopoverLeave = () => {
		popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 300)
	}
	const handleReactionSelect = (reaction) => {
		setCurrentReaction(reaction === currentReaction ? null : reaction)
		setReactionAnchorEl(null)
	}

	return (
		<Fade in timeout={500} unmountOnExit>
			<Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, ':hover': { boxShadow: (theme) => `0px 0px 10px 0px ${theme.palette.primary.main}` }, position: 'relative' }} elevation={1}>
				<CardActionArea component={Link} to={`/post/${post.id}`}>
					<CardMedia
						sx={{
							height: { md: 160, xs: 200 },
							bgcolor: 'rgba(0, 0, 0, 0.5)',
							position: 'relative',
							'&::after': {
								content: '""',
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								bgcolor: 'rgba(0, 0, 0, 0.5)',
								zIndex: 1
							}
						}}
						image={getThumbnail(post.imageUrl)}
					/>
					<CardContent>
						<TruncatedText maxLength={50} variant="h5" gutterBottom>
							{post.title}
						</TruncatedText>
						<Typography variant="body2" color="text.secondary.muted">
							{post.tags.map((tag) => `#${tag.tag.name} `)}
						</Typography>
						<Box marginTop={1}>
							<TruncatedText maxLength={100} color="text.secondary">
								{post.description}
							</TruncatedText>
						</Box>
					</CardContent>
				</CardActionArea>
				<CardHeader
					avatar={<UserAvatar handleClick={() => navigate(`/user/${post.authorId}`)} user={post.author} />}
					title={post.author.fullName}
					subheader={moment(post.createdAt).format('Do MMM YYYY \\at h:mm a')}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						zIndex: 2,
						color: 'white',
						'& .MuiCardHeader-title': { color: 'white' },
						'& .MuiCardHeader-subheader': { color: 'rgba(255, 255, 255, 0.7)' }
					}}
					action={
						<IconButton aria-label="edit">
							<Edit sx={{ width: 20, height: 20 }} />
						</IconButton>
					}
				/>
				<CardActions>
					<Stack flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
						<Box onMouseEnter={handleReactionIconEnter} onMouseLeave={handleReactionIconLeave}>
							<IconButton size="small" sx={{ color: currentReaction ? currentReaction.color : 'textPrimary' }}>
								{currentReaction ? <currentReaction.icon /> : <ThumbUpOutlined />}
								{post.reactionCount || ''}
							</IconButton>
						</Box>

						{user?.id === post.authorId && (
							<Button color="error" startIcon={isPending ? <CircularProgress size={20} /> : <Delete />} onClick={() => deletePost(post.id)} disabled={isPending}>
								Delete
							</Button>
						)}
					</Stack>
					<Popover
						open={Boolean(reactionAnchorEl)}
						anchorEl={reactionAnchorEl}
						onClose={() => setReactionAnchorEl(null)}
						anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
						transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						disableRestoreFocus
						slotProps={{
							paper: {
								onMouseEnter: handlePopoverEnter,
								onMouseLeave: handlePopoverLeave
							}
						}}
					>
						<Paper sx={{ p: 1, border: (theme) => `1px solid ${theme.palette.divider}` }}>
							{reactions.map((reaction) => (
								<IconButton
									key={reaction.label}
									onClick={() => handleReactionSelect(reaction)}
									sx={{
										color: reaction === currentReaction ? 'white' : reaction.color,
										bgcolor: reaction === currentReaction ? reaction.color : 'transparent'
									}}
								>
									<reaction.icon />
								</IconButton>
							))}
						</Paper>
					</Popover>
				</CardActions>
			</Card>
		</Fade>
	)
}

export default PostCard
