import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { Typography, Grid2 as Grid, Box, Container, Stack } from '@mui/material'
import { PostCard, PostCardSkeleton } from '@/components'
import { useSearchPosts, useSearchPostsByTag } from '@/hooks'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@/store'

const SearchGrid = ({ term, queryFn }) => {
	const { ref, inView } = useInView()
	const navigate = useNavigate()
	const {
		data: posts,
		isPending,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isError,
		error
	} = queryFn(term)
	const { openSnackbar } = useStore()

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView, hasNextPage, fetchNextPage])

	if (isPending) {
		return Array.from({ length: 6 }).map((_, i) => (
			<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
				<PostCardSkeleton />
			</Grid>
		))
	}

	if (isError) {
		navigate('/')
		openSnackbar(`Error loading posts: ${error.message}`, 'error')
	}

	const allPosts = posts.pages.flatMap((page) => page.posts)
	return (
		<>
			{allPosts.length > 0 ? (
				allPosts.map((post) => (
					<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={post.id}>
						<PostCard post={post} />
					</Grid>
				))
			) : (
				<Grid container size={12} justifyContent="center">
					<Typography variant="h6" textAlign="center">
						No posts found
					</Typography>
				</Grid>
			)}

			{isFetchingNextPage && (
				<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
					<PostCardSkeleton />
				</Grid>
			)}
			<Box ref={ref} height="10px" />
		</>
	)
}

const Search = ({ hashtag }) => {
	const [searchParams] = useSearchParams()
	const { tag } = useParams()
	const searchTerm = hashtag ? tag : searchParams.get('q') || ''
	const queryFn = tag ? useSearchPostsByTag : useSearchPosts

	return (
		<Container sx={{ py: { xs: 2, md: 4 }, height: '100vh' }} maxWidth="xl">
			<Stack flexGrow={1}>
				<Typography variant="h4" gutterBottom>
					Search results for
					{hashtag ? ` #${tag}` : ` "${searchTerm}"`}
				</Typography>
				<Grid
					container
					overflow="auto"
					height={'calc(100vh - 170px)'}
					minHeight={400}
					spacing={2}
					sx={{
						'&::-webkit-scrollbar': { display: 'none' },
						scrollbarWidth: 'none',
						msOverflowStyle: 'none'
					}}
				>
					<SearchGrid term={searchTerm} queryFn={queryFn} />
				</Grid>
			</Stack>
		</Container>
	)
}

export default Search
