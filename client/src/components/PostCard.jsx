import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button, Menu, MenuItem, Popover, Paper, CardActionArea, AvatarGroup, Box, Stack } from '@mui/material'
import { MoreVert, Share, ThumbUp, Delete, Favorite, EmojiEmotions, SentimentVeryDissatisfied, Mood, SentimentDissatisfied, ThumbUpOutlined } from '@mui/icons-material'

const reactions = [
	{ icon: ThumbUp, label: 'Like', color: '#2196f3' },
	{ icon: Favorite, label: 'Love', color: '#e91e63' },
	{ icon: EmojiEmotions, label: 'Haha', color: '#ffc107' },
	{ icon: SentimentVeryDissatisfied, label: 'Sad', color: '#607d8b' },
	{ icon: Mood, label: 'Wow', color: '#4caf50' },
	{ icon: SentimentDissatisfied, label: 'Angry', color: '#ff5722' }
]

const PostCard = ({ post }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [reactionAnchorEl, setReactionAnchorEl] = useState(null)
	const [currentReaction, setCurrentReaction] = useState(null)

	const handleMenuClick = (event) => setAnchorEl(event.currentTarget)
	const handleMenuClose = () => setAnchorEl(null)
	const handleReactionHover = (event) => setReactionAnchorEl(event.currentTarget)
	const handleReactionHoverClose = () => setReactionAnchorEl(null)
	const handleReactionClick = (reaction) => {
		setCurrentReaction(reaction)
		handleReactionHoverClose()
	}

	return (
		<Card>
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
						<img src="https://github.com/shadcn.png" alt="avatar" width="100%" />
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
				<CardMedia
					sx={{
						height: { md: 140, xs: 200 },
						':hover': {
							opacity: 0.6,
							cursor: 'pointer'
						}
					}}
					image="/favicon.ico"
					title="Post image"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Lorem, ipsum.
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos nobis necessitatibus dolores ab quod,
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Stack flexDirection="row" sx={{ gap: 0 }}>
					<Button
						size="small"
						color={currentReaction ? currentReaction?.color : 'textPrimary'}
						startIcon={currentReaction ? <currentReaction.icon /> : <ThumbUpOutlined />}
						title="react"
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							color: currentReaction ? currentReaction?.color : 'textPrimary'
						}}
						onMouseEnter={handleReactionHover}
						onClick={() => handleReactionClick(currentReaction)}
					/>
					<Popover open={Boolean(reactionAnchorEl)} anchorEl={reactionAnchorEl} onClose={handleReactionHoverClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'bottom', horizontal: 'left' }} disableRestoreFocus>
						<Paper sx={{ display: 'flex', p: 1 }}>
							{reactions.map((reaction) =>
								reaction === currentReaction ? (
									<IconButton key={reaction.label} onClick={() => handleReactionClick(currentReaction ? null : reaction)} sx={{ color: reaction.white, bgcolor: reaction.color }}>
										<reaction.icon />
									</IconButton>
								) : (
									<IconButton key={reaction.label} onClick={() => handleReactionClick(reaction)} sx={{ color: reaction.color }}>
										<reaction.icon />
									</IconButton>
								)
							)}
						</Paper>
					</Popover>
					<AvatarGroup  max={4} total={34} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12, cursor: 'pointer' } }}>
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
