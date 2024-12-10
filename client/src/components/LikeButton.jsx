import { useState } from 'react'
import {
	Stack,
	IconButton,
	Typography,
	CircularProgress,
	ClickAwayListener
} from '@mui/material'
import { ThumbUp, ThumbUpOffAlt } from '@mui/icons-material'
import { useGetCommentLikes, useLikeComment } from '@/hooks'
import { useUser } from '@clerk/clerk-react'
import { PopoverUserList } from '.'

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
					<PopoverUserList
						id={commentId}
						anchorEl={anchorEl}
						open={isOpen}
						onClose={handleClose}
						total={data.likeCount}
					/>
				)}
			</Stack>
		</ClickAwayListener>
	)
}

export default LikeButton
