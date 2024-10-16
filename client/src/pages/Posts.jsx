import { Container, Grid2 as Grid } from '@mui/material'
import { PostCard, SearchForm, CreatePostForm, Bottombar, PostCardSkeleton } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '@/reducers/post'
import { useEffect, useRef } from 'react'

const Posts = () => {
	const dispatch = useDispatch()
	const initialFetchDone = useRef(false)
	const { posts, loading, hasMore } = useSelector((state) => state.posts)

	const loadMorePosts = () => {
		if (!loading && hasMore) {
			dispatch(getPosts())
		}
	}

	useEffect(() => {
		if (!initialFetchDone.current) {
			loadMorePosts()
			initialFetchDone.current = true
		}
	}, [loadMorePosts])

	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
			loadMorePosts()
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	return (
		<Container sx={{ py: { xs: 2, md: 4 }, mb: 10 }} maxWidth="xl">
			<Grid container spacing={3}>
				<Grid container size={{ xs: 12, md: 8, xl: 9 }}>
					{posts.map((post) => (
						<Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={post.id}>
							<PostCard post={post} />
						</Grid>
					))}
					{loading &&
						hasMore &&
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
