import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Delete, MoreVert, Person, Share, ThumbUpOutlined } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, CardActionArea, CardHeader, Avatar, IconButton, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material'

const PostCard = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [open, setOpen] = useState(false)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
		setOpen(!open)
	}
	return (
		<Card sx={{ position: 'relative' }}>
			<CardHeader
				sx={{
					position: 'absolute',
					top: 0,
					bgcolor: 'transparent',
					zIndex: 1,
					left: 0,
					right: 0,
					color:'white',
				}}
				avatar={
					<Avatar
						component={Link}
						to={`/user/dynamic-user-id`}
						sx={{
							':hover': {
								outline: '2px solid',
								outlineOffset: '1px',
								outlineColor: 'primary.main',
							},
						}}
					>
						<Person />
					</Avatar>
				}
				action={
					<IconButton id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} aria-label="settings" onClick={handleClick}>
						<MoreVert />
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={() => setOpen(false)}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							<MenuItem onClick={() => {}}>
								<ListItemText primary="Share" sx={{ mr: 1.5 }} />
								<ListItemIcon>
									<Share />
								</ListItemIcon>
							</MenuItem>
						</Menu>
					</IconButton>
				}
				title="Shrimp and Chorizo Paella"
				subheader="September 14, 2016"
			/>
			<CardActionArea component={Link} to="/post/sssadsa">
				<CardMedia
					sx={{
						height: { md: 140, xs: 200 },
						':hover': {
							opacity: 0.6,
							cursor: 'pointer',
						},
					}}
					image="/favicon.ico"
					title="green iguana"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Lorem, ipsum.
					</Typography>
					<Typography variant="body2" sx={{ color: 'text.secondary' }}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos nobis necessitatibus dolores ab quod,
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary" startIcon={<ThumbUpOutlined />} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					Like
				</Button>
				<Button size="small" color="error" startIcon={<Delete />} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					Delete
				</Button>
			</CardActions>
		</Card>
	)
}

export default PostCard
