import { Card, CardHeader, CardContent, Skeleton, CardActions, Stack, CardActionArea } from '@mui/material'

const PostCardSkeleton = () => {
	return (
		<Card>
			<CardHeader //
				sx={{ position: 'relative' }}
				avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
				title={<Skeleton animation="wave" height={16} width="80%" style={{ marginBottom: 6 }} />}
				subheader={<Skeleton animation="wave" height={10} width="40%" />}
				action={
					<Stack display="flex" gap="2px" top="30%" right="5.5%" position="absolute">
						<Skeleton animation="wave" variant="circular" width={5} height={5} />
						<Skeleton animation="wave" variant="circular" width={5} height={5} />
						<Skeleton animation="wave" variant="circular" width={5} height={5} />
					</Stack>
				}
			/>
			<Skeleton sx={{ height: { xs: 220, md: 140 } }} animation="wave" variant="rectangular" />
			<CardActionArea>
				<CardContent sx={{ height: 125 }}>
					<>
						<Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} width="50%" />
						<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
						<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
						<Skeleton animation="wave" height={10} width="80%" />
					</>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Skeleton animation="wave" height={40} width="15%" />
				<Skeleton animation="wave" height={40} width="24%" />
			</CardActions>
		</Card>
	)
}

export default PostCardSkeleton
