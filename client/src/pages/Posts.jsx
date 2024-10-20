import { Container, Grid2 as Grid } from '@mui/material'
import { PostCard, SearchForm, CreatePostForm, Bottombar, PostCardSkeleton } from '@/components'
import { Fragment, useEffect, useCallback } from 'react'
import { useGetPosts, useCreatePost, useDeletePost } from '@/hooks'
import { useAuth } from '@clerk/clerk-react'
import { useInView } from 'react-intersection-observer'
import { useQueryClient } from '@tanstack/react-query'

const Posts = () => {
	return (
		<Container sx={{ py: { xs: 2, md: 4 }, mb: 10 }} maxWidth="xl">
			<Grid container spacing={3}>
				<Grid container size={{ xs: 12, md: 8, xl: 9 }} height={1}>
					<PostGrid />
				</Grid>
				<Grid container size={{ xs: 12, md: 4, xl: 3 }} position="sticky" height={1} top={95} sx={{ display: { xs: 'none', md: 'flex' } }}>
					<Grid size={{ xs: 12 }}>
						<CreatePostForm />
					</Grid>
					<Grid size={{ xs: 12 }}>
						<SearchForm />
					</Grid>
				</Grid>
			</Grid>
			<Bottombar />
		</Container>
	)
}

const PostGrid = () => {
	const { isLoaded } = useAuth()
	const { data, isLoading, isFetching, fetchNextPage, hasNextPage, error } = useGetPosts(null, 9)
	const { ref, inView } = useInView({ threshold: 0 })

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView, fetchNextPage, hasNextPage])

	if (!isLoaded || isLoading) {
		return Array.from({ length: 6 }).map((_, i) => (
			<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={i}>
				<PostCardSkeleton />
			</Grid>
		))
	}

	if (error) {
		return <Grid xs={12}>Error loading posts: {error.message}</Grid>
	}

	return (
		<>
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.posts.map((post) => (
						<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={post.id}>
							<PostCard post={post} />
						</Grid>
					))}
				</Fragment>
			))}
			{(isFetching || hasNextPage) && (
				<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} ref={ref}>
					<PostCardSkeleton />
				</Grid>
			)}
		</>
	)
}

export default Posts
