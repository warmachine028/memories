import { Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Divider, IconButton, Paper, Typography } from '@mui/material'
import { CommentSection, PostSection } from '../sections'
import { Delete, ThumbUpSharp } from '@mui/icons-material'
const Post = () => {
	return (
		<Container sx={{ gap: 2, display: 'flex', p: 1, flexDirection: 'column', bgcolor: 'transparent' }} maxWidth="xl">
			<PostSection />
			<CommentSection />
		</Container>
	)
}

export default Post
