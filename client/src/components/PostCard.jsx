import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button, Menu, MenuItem, Popover, Paper, CardActionArea, AvatarGroup, Stack, Tooltip, Box } from '@mui/material'
import { MoreVert, Share, ThumbUp, Delete, Favorite, EmojiEmotions, SentimentVeryDissatisfied, Mood, SentimentDissatisfied, ThumbUpOutlined } from '@mui/icons-material'
import { UserAvatar } from '.'
const user = { imageUrl: 'https://github.com/shadcn.png', fullName: 'Morty Smith' }
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
	const [anchorEl, setAnchorEl] = useState(null)
	const [reactionAnchorEl, setReactionAnchorEl] = useState(null)
	const [currentReaction, setCurrentReaction] = useState(null)

	const popoverTimeoutRef = useRef(null)

	const handleMenuClose = () => setAnchorEl(null)

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
	const navigate = useNavigate()
	return (
		<Card sx={{ height: { md: 370 }, border: (theme) => `1px solid ${theme.palette.divider}`, ':hover': { boxShadow: (theme) => `0px 0px 10px 0px ${theme.palette.primary.main}` } }} elevation={1}>
			<Menu id="post-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<MenuItem onClick={handleMenuClose}>
					<Share sx={{ mr: 1 }} />
					Share
				</MenuItem>
			</Menu>
			<CardActionArea component={Link} to={`/post/${post.id}`} sx={{ position: 'relative' }}>
				<Tooltip title="Click to view post" arrow placement="top-end">
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
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								zIndex: 1
							}
						}}
						image={post.imageUrl}
					>
						<CardHeader
							avatar={<UserAvatar handleClick={() => navigate(`/user/${post.author.id}`)} user={post.author} />}
							title={post.author.fullName}
							subheader="September 14, 2016"
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								zIndex: 2,
								color: 'white',
								'& .MuiCardHeader-title': { color: 'white' },
								'& .MuiCardHeader-subheader': { color: 'rgba(255, 255, 255, 0.7)' }
							}}
						/>
					</CardMedia>
				</Tooltip>
				<CardContent>
					<TruncatedText
						maxLength={50}
						variant="h5"
						gutterBottom
					>
						{post.title}
					</TruncatedText>
					<Typography variant="body2" color="text.secondary.muted">
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Box marginTop={1}>
						<TruncatedText maxLength={100} color="text.secondary">
							{post.body}
						</TruncatedText>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<Stack flexDirection="row" alignItems="center">
					<Box onMouseEnter={handleReactionIconEnter} onMouseLeave={handleReactionIconLeave}>
						<IconButton //
							size="small"
							title="react"
							sx={{ color: currentReaction ? currentReaction?.color : 'textPrimary' }}
						>
							{currentReaction ? <currentReaction.icon /> : <ThumbUpOutlined />}
						</IconButton>
					</Box>
					<Popover //
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
						<Paper sx={{ display: 'flex', p: 1 }}>
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
					<AvatarGroup max={4} total={post.reactions.likes} slotProps={{ additionalAvatar: { sx: { width: 24, height: 24, fontSize: 10, cursor: 'pointer' } } }} sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}>
						<Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
						<Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
						<Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
						<Avatar alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
						<Avatar alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
					</AvatarGroup>
				</Stack>
				<Button size="small" color="error" startIcon={<Delete />} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					Delete
				</Button>
			</CardActions>
		</Card>
	)
}

export default PostCard
