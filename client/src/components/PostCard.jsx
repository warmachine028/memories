import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button, Menu, MenuItem, Popover, Paper, CardActionArea, AvatarGroup, Stack, Tooltip, Box } from '@mui/material'
import { MoreVert, Share, ThumbUp, Delete, Favorite, EmojiEmotions, SentimentVeryDissatisfied, Mood, SentimentDissatisfied, ThumbUpOutlined } from '@mui/icons-material'
import axios from 'axios'

const reactions = [
	{ icon: ThumbUp, label: 'Like', color: '#2196f3' },
	{ icon: Favorite, label: 'Love', color: '#e91e63' },
	{ icon: EmojiEmotions, label: 'Haha', color: '#ffc107' },
	{ icon: SentimentVeryDissatisfied, label: 'Sad', color: '#607d8b' },
	{ icon: Mood, label: 'Wow', color: '#4caf50' },
	{ icon: SentimentDissatisfied, label: 'Angry', color: '#ff5722' }
]

const TruncatedText = ({ children: text, maxLength, ...props }) => {
	const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text
	return (
		<Tooltip title={text} arrow placement="top">
			<Typography
				sx={{
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: '-webkit-box',
					WebkitLineClamp: maxLength === 100 ? 3 : 1,
					WebkitBoxOrient: 'vertical'
				}}
				{...props}
			>
				{truncated}
			</Typography>
		</Tooltip>
	)
}

const PostCard = ({ post }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [reactionAnchorEl, setReactionAnchorEl] = useState(null)
	const [currentReaction, setCurrentReaction] = useState(null)
	const [imageUrl, setImageUrl] = useState('')
	const handleMenuClick = (event) => setAnchorEl(event.currentTarget)
	const handleMenuClose = () => setAnchorEl(null)
	const handleReactionHover = (event) => setReactionAnchorEl(event.currentTarget)
	const handleReactionClick = (event) => {
		if (reactionAnchorEl) {
			setReactionAnchorEl(null)
		} else {
			setReactionAnchorEl(event.currentTarget)
		}
	}
	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await axios.get('https://picsum.photos/800/600', { responseType: 'blob' })
				const url = URL.createObjectURL(response.data)
				setImageUrl(url)
			} catch (error) {
				console.error('Error fetching image:', error)
			}
		}

		fetchImage()

		// Clean up the object URL when the component unmounts
		return () => {
			if (imageUrl) {
				URL.revokeObjectURL(imageUrl)
			}
		}
	}, [])

	const handleReactionSelect = (reaction) => {
		setCurrentReaction(reaction)
		setReactionAnchorEl(null)
	}

	const handleReactionIconEnter = (event) => {
		clearTimeout(popoverTimeoutRef.current)
		setReactionAnchorEl(event.currentTarget)
	}

	const handleReactionIconLeave = () => {
		popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 300) // Delay before closing to allow time to move to the popover
	}

	const handlePopoverEnter = () => {
		clearTimeout(popoverTimeoutRef.current)
	}

	const handlePopoverLeave = () => {
		setReactionAnchorEl(null)
	}
	return (
		<Card sx={{ height: { md: 400 }, display: 'flex', flexDirection: 'column' }}>
			<CardHeader
				avatar={
					<Avatar
						component={Link}
						to={`/user/${'dynamic-user-id'}`}
						sx={{
							':hover': {
								outline: '2px solid',
								outlineOffset: '1px',
								outlineColor: 'primary.main'
							}
						}}
					>
						<Box component="img" src="https://github.com/shadcn.png" alt="avatar" width="100%" />
					</Avatar>
				}
				action={
					<IconButton id="post-menu" aria-controls={anchorEl ? 'settings' : undefined} aria-haspopup="true" aria-expanded={Boolean(anchorEl)} aria-label="settings" onClick={handleMenuClick}>
						<MoreVert />
					</IconButton>
				}
				title="Saul Goodman"
				subheader="September 14, 2016"
			/>
			<Menu id="post-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<MenuItem onClick={handleMenuClose}>
					<Share sx={{ mr: 1 }} />
					Share
				</MenuItem>
			</Menu>
			<CardActionArea component={Link} to="/post/sssadsa">
				<CardMedia sx={{ height: { md: 140, xs: 200 } }} image={imageUrl} title="Post image" />
				<CardContent>
					<TruncatedText maxLength={50} variant="h5" gutterBottom>
						{post.title}
					</TruncatedText>
					<Box marginTop={1}>
						<TruncatedText maxLength={100} color="text.secondary">
							{post.body}
						</TruncatedText>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<Stack flexDirection="row" alignItems="center">
					<Tooltip title="react" arrow>
						<IconButton //
							size="small"
							title="react"
							sx={{ color: currentReaction ? currentReaction?.color : 'textPrimary' }}
							// onMouseEnter={handleReactionHover}
							onMouseEnter={handleReactionIconEnter}
							onMouseLeave={handleReactionIconLeave}
							onClick={handleReactionClick}
						>
							{currentReaction ? <currentReaction.icon /> : <ThumbUpOutlined />}
						</IconButton>
					</Tooltip>
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
							{reactions.map((reaction) =>
								reaction === currentReaction ? (
									<IconButton key={reaction.label} onClick={() => handleReactionSelect(currentReaction ? null : reaction)} sx={{ color: reaction.white, bgcolor: reaction.color }}>
										<reaction.icon />
									</IconButton>
								) : (
									<IconButton key={reaction.label} onClick={() => handleReactionSelect(reaction)} sx={{ color: reaction.color }}>
										<reaction.icon />
									</IconButton>
								)
							)}
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
