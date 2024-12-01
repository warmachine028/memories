import { Bottombar, TrendingTags } from '@/components'
import { Container } from '@mui/material'

const Trending = () => {
	return (
		<Container sx={{ py: { xs: 2, md: 4 }, height: '100vh' }} maxWidth="xl">
			<TrendingTags />
			<Bottombar />
		</Container>
	)
}

export default Trending
