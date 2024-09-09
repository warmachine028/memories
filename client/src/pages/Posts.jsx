import { Container, Grid2 as Grid } from '@mui/material'
import { PostCard, SearchForm, CreatePostForm, Bottombar } from '@/components'

const Posts = () => {
	return (
		<Container sx={{ paddingY: 10 }} maxWidth="xl">
			<Grid container spacing={3}>
				<Grid container size={{ xs: 12, md: 8, xl: 9 }}>
					{[1, 2, 3, 4, 5, 6].map((post) => (
						<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={post}>
							<PostCard />
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
