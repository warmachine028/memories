import { Box, Skeleton, Stack } from '@mui/material'

const CommentSkeleton = () => (
	<Stack flexDirection="row">
		<Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
		<Box sx={{ width: '100%' }}>
			<Skeleton variant="text" width="20%" />
			<Skeleton variant="text" width="100%" />
			<Skeleton variant="text" width="80%" />
		</Box>
	</Stack>
)

export default CommentSkeleton
