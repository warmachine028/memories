import { useEffect, useRef, useState } from 'react'
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
	Avatar,
	ClickAwayListener
} from '@mui/material'
import { ThumbUp, ThumbUpOffAlt } from '@mui/icons-material'
import { useGetCommentLikes, useLikeComment, useGetLikedUsers } from '@/hooks'
import { useUser } from '@clerk/clerk-react'
import { UserAvatar } from '.'

const LikeButton = ({ commentId }) => {
	const { user } = useUser()
	const { data, isFetching } = useGetCommentLikes(commentId)
	const { mutate: likeComment } = useLikeComment()
	const [anchorEl, setAnchorEl] = useState(null)
	const [isOpen, setIsOpen] = useState(false)

	const handleLike = () =>
		likeComment({
			commentId,
			isLiked: data.isLiked
		})

	const handleMouseEnter = (event) => {
		setAnchorEl(event.currentTarget)
		setIsOpen(true)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	if (isFetching) {
		return <CircularProgress size={20} />
	}

	return (
		<ClickAwayListener onClickAway={handleClose}>
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
					sx={{
						cursor: 'pointer',
						'&:hover': { textDecoration: 'underline' },
						userSelect: 'none', // This prevents text selection
						WebkitUserSelect: 'none', // For webkit browsers like Chrome and Safari
						MozUserSelect: 'none', // For Firefox
						msUserSelect: 'none' // For Internet Explorer/Edge
					}}
				>
					{data.likeCount} {data.likeCount === 1 ? 'like' : 'likes'}
				</Typography>
				{data.likeCount > 0 && (
					<UserList
						commentId={commentId}
						anchorEl={anchorEl}
						open={isOpen}
						onClose={handleClose}
						totalLikes={data.likeCount}
					/>
				)}
			</Stack>
		</ClickAwayListener>
	)
}

const UserList = ({ commentId, anchorEl, open, onClose, totalLikes }) => {
	const { data, isFetching, fetchNextPage, hasNextPage } =
		useGetLikedUsers(commentId)
	const listRef = useRef(null)

	useEffect(() => {
		const handleScroll = () => {
			if (listRef.current) {
				const { scrollTop, clientHeight, scrollHeight } =
					listRef.current
				if (
					scrollHeight - scrollTop <= clientHeight + 1 &&
					hasNextPage &&
					!isFetching
				) {
					fetchNextPage()
				}
			}
		}

		const currentListRef = listRef.current
		if (currentListRef) {
			currentListRef.addEventListener('scroll', handleScroll)
		}

		return () => {
			if (currentListRef) {
				currentListRef.removeEventListener('scroll', handleScroll)
			}
		}
	}, [fetchNextPage, hasNextPage, isFetching])

	return (
		<Popper
			open={open}
			anchorEl={anchorEl}
			placement="bottom-start"
			onClose={onClose}
			modifiers={[
				{
					name: 'offset',
					options: { offset: [0, 8] }
				}
			]}
		>
			<Paper elevation={0}>
				<List
					ref={listRef}
					sx={{ width: 250, maxHeight: 300, overflow: 'auto' }}
				>
					{data?.pages.flatMap((page) =>
						page.users.slice(0, totalLikes).map((user) => (
							<ListItem key={user.id}>
								<ListItemAvatar>
									<UserAvatar user={user} size={40} />
								</ListItemAvatar>
								<ListItemText primary={user.fullName} />
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
