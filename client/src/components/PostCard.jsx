import { Delete, ThumbsUpDown, ThumbUpOutlined } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material'

const PostCard = () => {
	return (
		<Card sx={{ maxWidth: { md: 345 } }}>
			<ButtonBase component="a" href="/post/sssadsa">
				<div>
					<CardMedia sx={{ height: { md: 140, xs: 200 } }} image="/favicon.ico" title="green iguana" />
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Lizard
						</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary' }}>
							Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
						</Typography>
					</CardContent>
				</div>
			</ButtonBase>
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
