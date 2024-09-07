import { Delete, MoreVert, Person, ThumbsUpDown, ThumbUpOutlined } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, CardActionArea, CardHeader, Avatar, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

const PostCard = () => {
	return (
		<Card sx={{ maxWidth: { md: 345 }, position: 'relative' }}>
			<CardHeader
				sx={{ position: 'absolute', top: 0, bgcolor: 'transparent', zIndex: 10, width: '100%' }}
				avatar={
					<Avatar component={Link} to={`/user/dynamic-user-id`}>
						<Person />
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVert />
					</IconButton>
				}
				title="Shrimp and Chorizo Paella"
				subheader="September 14, 2016"
			/>
			<CardActionArea component="a" href="/post/sssadsa">
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
