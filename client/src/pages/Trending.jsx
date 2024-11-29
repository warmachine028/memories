import { Bottombar, TrendingTags } from '@/components'
import { Container } from '@mui/material'

const Trending = () => {
	const tags = [
		{
			hashtag: 'media',
			count: 5
		},
		{
			hashtag: 'post',
			count: 5
		},
		{
			hashtag: 'social',
			count: 5
		},
		{
			hashtag: 'love',
			count: 3
		},
		{
			hashtag: 'chocolates',
			count: 2
		}
	]
	return (
		<Container sx={{ py: { xs: 2, md: 4 }, height: '100vh' }} maxWidth="xl">
			<TrendingTags tags={tags} />
			<Bottombar />
		</Container>
	)
}

export default Trending
