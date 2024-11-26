import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Skeleton,
	Typography
} from '@mui/material'
import { ArrowDownward } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { useGetComments } from '@/hooks'
import { Comment, CommentSkeleton, CreateComment } from '@/components'

const Comments = () => {
	const { id: postId } = useParams()
	const {
		data: comments,
		isPending,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isError,
		error
	} = useGetComments(postId)

	if (isPending) {
		return (
			<Card sx={{ width: '100%' }}>
				<CardHeader title={<Skeleton width={150} />} />
				<CardContent>
					<CreateComment postId={postId} />
					<CommentSkeleton />
				</CardContent>
			</Card>
		)
	}

	if (isError) {
		return (
			<Card sx={{ width: '100%' }}>
				<Typography>Error loading comments: {error}</Typography>
			</Card>
		)
	}

	const allComments = comments.pages.flatMap((page) => page.comments)

	return (
		<Card sx={{ width: '100%' }}>
			<CardHeader title={`${allComments.length} Comments`} />
			<CardContent>
				<CreateComment postId={postId} />
				{allComments.map((comment) => (
					<Comment comment={comment} key={comment.id} />
				))}

				{hasNextPage && (
					<Button
						onClick={fetchNextPage}
						endIcon={
							isFetchingNextPage ? (
								<CircularProgress size={24} />
							) : (
								<ArrowDownward />
							)
						}
						disabled={isFetchingNextPage}
					>
						Load More Comments
					</Button>
				)}
			</CardContent>
		</Card>
	)
}
export default Comments
