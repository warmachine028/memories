import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Stack } from '@mui/material'
import { Skeleton } from '@mui/material'

const AuthorInfoSkeleton = () => (
	<Stack direction="row" alignItems="center" mb={2} width="100%" minWidth={250} spacing={1}>
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

const PostActionsSkeleton = () => (
	<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" mt={2} spacing={2}>
		<Stack direction="row" spacing={2}>
			{[1, 2].map((item) => (
				<Stack key={item} alignItems="center" direction="row" spacing={1}>
					<Skeleton variant="circular" width={24} height={24} />
					<Skeleton variant="text" width={80} height={40} />
				</Stack>
			))}
		</Stack>
		<Stack alignItems="center" direction="row" spacing={1}>
			<Skeleton variant="circular" width={24} height={24} />
			<Skeleton variant="text" width={80} height={40} />
		</Stack>
	</Stack>
)

const PostSkeleton = () => {
	return (
		<Card elevation={3} sx={{ width: '100%' }}>
			<Skeleton variant="rectangular" height={400} animation="wave" />
			<Stack divider={<Divider sx={{ my: 2 }} />}>
				<CardHeader avatar={<AuthorInfoSkeleton />} />
				<CardContent>
					<Skeleton variant="text" width="80%" height={50} animation="wave" />
					<Stack mb={2} mt={2} direction="row">
						{[1, 2, 3].map((item) => (
							<Skeleton key={item} variant="rectangular" width={60} height={32} sx={{ mr: 1, borderRadius: 10 }} animation="wave" />
						))}
					</Stack>
					{[1, 2, 3].map((item) => (
						<Skeleton key={item} variant="text" height={20} animation="wave" sx={{ my: 1 }} />
					))}
					<Skeleton variant="text" height={20} animation="wave" sx={{ my: 1 }} width="50%" />
				</CardContent>
				<CardActions>
					<PostActionsSkeleton />
				</CardActions>
			</Stack>
		</Card>
	)
}

export default PostSkeleton
