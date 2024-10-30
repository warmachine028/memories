import {
	Card,
	CardHeader,
	CardContent,
	Skeleton,
	CardActions,
	Stack,
	CardActionArea,
	CardMedia,
	Fade
} from '@mui/material'

const PostCardSkeleton = () => {
	return (
		<Card sx={{ position: 'relative', height: '100%', minHeight: 350 }}>
			<CardActionArea
				sx={{
					mb: 5,
					'&:hover': {
						'& .MuiCardActionArea-focusHighlight': {
							opacity: 0
						}
					}
				}}
			>
				<CardMedia>
					<Skeleton
						sx={{ height: 180 }}
						animation="wave"
						variant="rectangular"
					/>
				</CardMedia>
				<CardContent sx={{ height: 'auto' }}>
					<Skeleton
						animation="wave"
						height={20}
						style={{ marginBottom: 6 }}
						width="50%"
					/>
					<Skeleton
						animation="wave"
						height={7}
						style={{ marginBottom: 6 }}
					/>
					<Skeleton
						animation="wave"
						height={10}
						style={{ marginBottom: 6 }}
					/>
				</CardContent>
			</CardActionArea>
			<CardHeader
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					zIndex: 2
				}}
				avatar={
					<Skeleton
						animation="wave"
						variant="circular"
						width={40}
						height={40}
					/>
				}
				title={
					<Skeleton
						animation="wave"
						height={16}
						width="80%"
						style={{ marginBottom: 6 }}
					/>
				}
				subheader={
					<Skeleton animation="wave" height={10} width="40%" />
				}
				action={
					<Stack gap="2px" top="30%" right="5.5%" position="absolute">
						<Skeleton
							animation="wave"
							variant="circular"
							width={5}
							height={5}
						/>
						<Skeleton
							animation="wave"
							variant="circular"
							width={5}
							height={5}
						/>
						<Skeleton
							animation="wave"
							variant="circular"
							width={5}
							height={5}
						/>
					</Stack>
				}
			/>
			<CardActions
				sx={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 2
				}}
			>
				<Stack
					justifyContent="space-between"
					flexDirection="row"
					width="100%"
				>
					<Stack
						flexDirection="row"
						alignItems="center"
						gap="5px"
						width="100%"
					>
						<Skeleton animation="wave" height={40} width="15%" />
					</Stack>
					<Skeleton animation="wave" height={40} width="24%" />
				</Stack>
			</CardActions>
		</Card>
	)
}

export default PostCardSkeleton
