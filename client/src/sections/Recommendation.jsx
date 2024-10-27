import { Card, CardHeader } from '@mui/material'

const Recommendation = () => {
	return (
		<Card elevation={3} sx={{ width: '100%', minHeight: '200px' }}>
			<CardHeader title="More like this" />
		</Card>
	)
}

export default Recommendation
