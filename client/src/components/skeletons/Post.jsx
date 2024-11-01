import {
	Skeleton,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Stack
} from '@mui/material'
import { AuthorInfoSkeleton, AvatarGroupSkeleton } from '.'

const PostSkeleton = () => {
	return (
		<Card sx={{ width: '100%' }}>
			<Skeleton variant="rectangular" height={400} animation="wave" />
			<Stack divider={<Divider sx={{ my: 2 }} />}>
				<CardHeader avatar={<AuthorInfoSkeleton />} />
				<CardContent>
					<Skeleton
						variant="text"
						width="80%"
						height={50}
						animation="wave"
					/>
					<Stack mb={2} mt={2} direction="row">
						{[1, 2, 3].map((item) => (
							<Skeleton
								key={item}
								variant="rectangular"
								width={60}
								height={32}
								sx={{ mr: 1, borderRadius: 10 }}
								animation="wave"
							/>
						))}
					</Stack>
					{[1, 2, 3].map((item) => (
						<Skeleton
							key={item}
							variant="text"
							height={20}
							animation="wave"
							sx={{ my: 1 }}
						/>
					))}
					<Skeleton
						variant="text"
						height={20}
						animation="wave"
						sx={{ my: 1 }}
						width="50%"
					/>
				</CardContent>
				<CardActions>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						justifyContent="space-between"
						mt={2}
						spacing={2}
						width
					>
						<Stack direction="row" spacing={2}>
							<Stack
								alignItems="center"
								direction="row"
								spacing={1}
							>
								<Skeleton
									variant="circular"
									width={24}
									height={24}
								/>
								<Skeleton
									variant="text"
									width={20}
									height={40}
								/>
							</Stack>
							<Stack
								alignItems="center"
								direction="row"
								spacing={1}
							>
								<Skeleton
									variant="circular"
									width={24}
									height={24}
								/>
								<Skeleton
									variant="text"
									width={20}
									height={40}
								/>
							</Stack>
						</Stack>
						<AvatarGroupSkeleton />
					</Stack>
				</CardActions>
			</Stack>
		</Card>
	)
}

export default PostSkeleton
