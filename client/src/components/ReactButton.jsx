import { useState } from 'react'
import {
	IconButton,
	Popover,
	Typography,
	Stack,
	CircularProgress,
	ClickAwayListener
} from '@mui/material'
import { ThumbUpOffAlt } from '@mui/icons-material'
import { useGetPostReactions, useReactPost } from '@/hooks'
import { useUser } from '@clerk/clerk-react'
import { reactions } from '@/data'

const ReactButton = ({ post }) => {
	const { user } = useUser()
	const { data, isFetching } = useGetPostReactions(post.id)
	const [anchorEl, setAnchorEl] = useState(null)
	const [isOpen, setIsOpen] = useState(false)

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

	const currentReaction = data.reactionType
	const currentReactionObj = reactions.find(
		(r) => r.label === currentReaction
	)

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<Stack direction="row" alignItems="center">
				<IconButton
					size="small"
					onMouseEnter={handleMouseEnter}
					disabled={!user}
				>
					{currentReactionObj ? (
						<currentReactionObj.icon
							fontSize="small"
							sx={{ color: currentReactionObj.color }}
						/>
					) : (
						<ThumbUpOffAlt fontSize="small" />
					)}
				</IconButton>
				<Typography
					variant="caption"
					sx={{
						cursor: 'pointer',
						userSelect: 'none', // This prevents text selection
						WebkitUserSelect: 'none', // For webkit browsers like Chrome and Safari
						MozUserSelect: 'none', // For Firefox
						msUserSelect: 'none' // For Internet Explorer/Edge
					}}
				>
					{data.reactionCount}
				</Typography>
				<Reactions
					postId={post.id}
					anchorEl={anchorEl}
					open={isOpen}
					onClose={handleClose}
					currentReaction={currentReaction}
				/>
			</Stack>
		</ClickAwayListener>
	)
}

const Reactions = ({
	postId,
	anchorEl,
	open,
	onClose: handleClose,
	currentReaction
}) => {
	const { mutate: reactPost } = useReactPost()

	const handleReact = (reactionType) => {
		const reaction = reactionType === currentReaction ? null : reactionType
		reactPost({ postId, type: reaction })
		handleClose()
	}
	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
			transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			disableRestoreFocus
			slotProps={{
				paper: {
					sx: { p: 1 },
					elevation: 0
				}
			}}
		>
			{reactions.map((reaction) => (
				<IconButton
					key={reaction.label}
					onClick={() => handleReact(reaction.label)}
					sx={{
						color:
							reaction.label === currentReaction
								? 'white'
								: reaction.color,
						bgcolor:
							reaction.label === currentReaction
								? reaction.color
								: 'transparent'
					}}
				>
					<reaction.icon />
				</IconButton>
			))}
		</Popover>
	)
}

export default ReactButton
