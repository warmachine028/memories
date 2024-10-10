import { Container, Grid2 as Grid } from '@mui/material'
import { PostCard, SearchForm, CreatePostForm, Bottombar, PostCardSkeleton } from '@/components'
import { useSelector } from 'react-redux'

const Posts = () => {
	const { posts, loading } = useSelector((state) => state.posts)
	return (
		<Container sx={{ py: { xs: 2, md: 4 }, mb: 10 }} maxWidth="xl">
			<Grid container spacing={3}>
				<Grid container size={{ xs: 12, md: 8, xl: 9 }}>
					{!loading
						? [...Array(6).keys()].map((post) => (
								<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={post}>
									{post % 2 ? <PostCard /> : <PostCardSkeleton />}
								</Grid>
							))
						: posts.map((post) => (
								<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={post}>
									<PostCard
										post={{
											id: 1
										}}
									/>
								</Grid>
							))}
				</Grid>
				<Grid container size={{ xs: 12, md: 4, xl: 3 }} display={{ xs: 'none', md: 'flex' }} height={1}>
					<Grid size={12}>
						<CreatePostForm />
					</Grid>
					<Grid size={12}>
						<SearchForm />
					</Grid>
				</Grid>
			</Grid>
			<Bottombar />
		</Container>
	)
}

export default Posts
