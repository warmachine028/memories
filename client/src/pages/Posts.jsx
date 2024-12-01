import { Box, Container, Grid2 as Grid, Paper } from '@mui/material'
import {
	PostCard,
	CreatePost as CreatePostForm,
	Bottombar,
	PostCardSkeleton,
	TrendingTags
} from '@/components'
import { useEffect } from 'react'
import { useGetPosts } from '@/hooks'
import { useInView } from 'react-intersection-observer'

const PostGrid = () => {
	const { ref, inView } = useInView()
	const {
		data: posts,
		isPending,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isError,
		error
	} = useGetPosts()

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView, hasNextPage, fetchNextPage])

	if (isPending) {
		return Array.from({ length: 6 }).map((_, i) => (
			<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={i}>
				<PostCardSkeleton />
			</Grid>
		))
	}

	if (isError) {
		return <Grid xs={12}>Error loading posts: {error.message}</Grid>
	}

	const allPosts = posts.pages.flatMap((page) => page.posts)
	return (
		<>
			{allPosts.map((post) => (
				<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={post.id}>
					<PostCard post={post} />
				</Grid>
			))}

			{isFetchingNextPage && (
				<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
					<PostCardSkeleton />
				</Grid>
			)}
			<Box ref={ref} height="10px" />
		</>
	)
}

const Posts = () => {
	return (
		<Container sx={{ py: { xs: 2, md: 4 }, height: '100vh' }} maxWidth="xl">
			<Grid container spacing={3}>
				<Grid
					container
					size={{ xs: 12, md: 8, xl: 9 }}
					overflow="auto"
					height={'calc(100vh - 170px)'}
					minHeight={400}
					sx={{
						'&::-webkit-scrollbar': { display: 'none' },
						scrollbarWidth: 'none',
						msOverflowStyle: 'none'
					}}
				>
					<PostGrid />
				</Grid>
				<Grid
					container
					size={{ xs: 12, md: 4, xl: 3 }}
					height={1}
					top={95}
					sx={{ display: { xs: 'none', md: 'flex' } }}
				>
					<Grid size={{ xs: 12 }}>
						<Paper elevation={0}>
							<CreatePostForm />
						</Paper>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<TrendingTags />
					</Grid>
				</Grid>
			</Grid>
			<Bottombar />
		</Container>
	)
}

export default Posts
