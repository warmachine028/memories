import { Container } from '@mui/material'
import { CommentSection, PostSection, RecommendationSection } from '@/sections'

const Post = () => {
	return (
		<Container
			sx={{
				gap: 2,
				display: 'flex',
				p: 1,
				flexDirection: 'column',
				bgcolor: 'transparent'
			}}
			maxWidth="xl"
		>
			<PostSection />
			<CommentSection />
			<RecommendationSection />
		</Container>
	)
}

export default Post
