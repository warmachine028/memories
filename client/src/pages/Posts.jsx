import { Container, Grid2 as Grid } from '@mui/material'
import { PostCard, SearchForm, CreatePostForm, Bottombar, PostCardSkeleton } from '@/components'
// import { useDispatch, useSelector } from 'react-redux'
// import { getPosts } from '@/reducers/post'
import { useEffect, useRef, useState } from 'react'
import { useApiWithAuth } from '@/hooks' // Import the generated hook
import { api } from '@/api'
const Posts = () => {
	const { isLoaded } = useApiWithAuth()
	const [cursor, setCursor] = useState('')

	const { data, isLoading, isFetching, refetch } = api.useGetPostsQuery(
		{ cursor, limit: 9 },
		{
			refetchOnMountOrArgChange: true,
			refetchOnFocus: true,
			refetchOnReconnect: true
		}
	)

	const loadMorePosts = () => {
		if (!isFetching && data?.nextCursor) {
			setCursor(data.nextCursor)
		}
	}

	useEffect(() => {
		if (!isLoaded) {
			refetch()
		}
	}, [isLoaded, refetch])

	useEffect(() => {
		if (data?.nextCursor) {
			setCursor(data.nextCursor)
		}
	}, [data])

	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
			loadMorePosts()
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	const posts = data?.posts || []

	return (
		<Container sx={{ py: { xs: 2, md: 4 }, mb: 10 }} maxWidth="xl">
			<Grid container spacing={3}>
				<Grid container size={{ xs: 12, md: 8, xl: 9 }} height={1}>
					{posts.map((post) => (
						<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={post.id}>
							<PostCard post={post} />
						</Grid>
					))}
					{(!isLoaded || isLoading) &&
						Array.from({ length: posts.length ? 3 : 6 }).map((_, i) => (
							<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={posts[i]?.id || i}>
								<PostCardSkeleton />
							</Grid>
						))}
				</Grid>
				<Grid container size={{ xs: 12, md: 4, xl: 3 }} position="sticky" display={{ xs: 'none', md: 'flex' }} height={1} top={95}>
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
