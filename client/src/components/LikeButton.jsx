import { useState } from 'react'
import {
	Stack,
	IconButton,
	Typography,
	CircularProgress,
	Popper,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar
} from '@mui/material'
import { ThumbUp, ThumbUpOffAlt } from '@mui/icons-material'
import { useGetCommentLikes, useLikeComment, useGetLikedUsers } from '@/hooks'
import { useUser } from '@clerk/clerk-react'

const LikeButton = ({ commentId }) => {
	const { user } = useUser()
	const { data, isFetching } = useGetCommentLikes(commentId)
	const { mutate: likeComment } = useLikeComment()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleLike = () =>
		likeComment({
			commentId,
			isLiked: data.isLiked
		})

	const handleMouseEnter = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMouseLeave = () => {
		setAnchorEl(null)
	}

	if (isFetching) {
		return <CircularProgress size={20} />
	}

	return (
		<Stack direction="row" alignItems="center">
			<IconButton size="small" onClick={handleLike} disabled={!user}>
				{data.isLiked ? (
					<ThumbUp fontSize="small" color="primary" />
				) : (
					<ThumbUpOffAlt fontSize="small" />
				)}
			</IconButton>
			<Typography
				variant="caption"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				sx={{
					cursor: 'pointer',
					'&:hover': { textDecoration: 'underline' }
				}}
			>
				{data.likes} {data.likes === 1 ? 'like' : 'likes'}
			</Typography>
			{data.likes > 0 && (
				<UserList
					commentId={commentId}
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={() => setAnchorEl(null)}
					totalLikes={data.likes}
				/>
			)}
		</Stack>
	)
}

const UserList = ({ commentId, anchorEl, open, onClose, totalLikes }) => {
	const { data, isFetching, fetchNextPage, hasNextPage } =
		useGetLikedUsers(commentId)

	const handleScroll = (event) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget
		if (
			scrollHeight - scrollTop <= clientHeight + 1 &&
			hasNextPage &&
			!isFetching
		) {
			fetchNextPage()
		}
	}

	if (!open) return null

	return (
		<Popper
			open={open}
			anchorEl={anchorEl}
			placement="bottom-start"
			onClose={onClose}
		>
			<Paper elevation={0}>
				<List
					sx={{ width: 250, maxHeight: 300, overflow: 'auto' }}
					onScroll={handleScroll}
				>
					{data?.pages.flatMap((page) =>
						page.users.slice(0, totalLikes).map((user) => (
							<ListItem key={user.id}>
								<ListItemAvatar>
									<Avatar
										src={`/placeholder.svg?height=40&width=40`}
										alt={user.name}
										sx={{ bgcolor: user.avatarColor }}
									>
										{user.name.charAt(0)}
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={user.name} />
							</ListItem>
						))
					)}
					{isFetching && (
						<ListItem>
							<CircularProgress size={20} />
						</ListItem>
					)}
				</List>
			</Paper>
		</Popper>
	)
}

export default LikeButton
