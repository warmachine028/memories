import { Container, Grid2 as Grid } from '@mui/material'
import { CommentSection, PostSection, RecommendationSection } from '@/sections'

const Post = () => {
	return (
		<Container sx={{ py: { xs: 2, md: 4 }, mb: 10 }} maxWidth="xl">
			<Grid container spacing={3}>
				<PostSection />
				<CommentSection />
				<RecommendationSection />
			</Grid>
		</Container>
	)
}

export default Post
