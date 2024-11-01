import { Skeleton, Box, Stack } from '@mui/material'

const AuthorInfoSkeleton = () => (
	<Stack
		direction="row"
		alignItems="center"
		mb={2}
		width="100%"
		minWidth={250}
		spacing={1}
	>
		<Box>
			<Skeleton variant="circular" width={60} height={60} />
		</Box>
		<Box width="100%">
			<Skeleton variant="text" height={27} />
			<Skeleton variant="text" width="40%" height={20} />
			<Skeleton variant="text" width="30%" height={16} />
		</Box>
	</Stack>
)

export default AuthorInfoSkeleton
