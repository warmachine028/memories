import { useState, useRef } from 'react'
import {
	IconButton,
	Popover,
	Typography,
	Stack,
	CircularProgress
} from '@mui/material'
import {
	ThumbUp,
	Favorite,
	EmojiEmotions,
	SentimentVeryDissatisfied,
	Mood,
	SentimentDissatisfied,
	ThumbUpOutlined
} from '@mui/icons-material'
import { useGetPostReactions, useReactPost } from '@/hooks'
import { useUser } from '@clerk/clerk-react'

const reactions = [
	{ icon: ThumbUp, label: 'LIKE', color: '#2196f3' },
	{ icon: Favorite, label: 'LOVE', color: '#e91e63' },
	{ icon: EmojiEmotions, label: 'HAHA', color: '#ffc107' },
	{ icon: SentimentVeryDissatisfied, label: 'SAD', color: '#607d8b' },
	{ icon: Mood, label: 'WOW', color: '#4caf50' },
	{ icon: SentimentDissatisfied, label: 'ANGRY', color: '#ff5722' }
]

const ReactButton = ({ post }) => {
	const { user } = useUser()
	const { data, isFetching } = useGetPostReactions(post.id)
	const { mutate: reactPost } = useReactPost()
	const [reactionAnchorEl, setReactionAnchorEl] = useState(null)
	const popoverTimeoutRef = useRef(null)

	const handleReactionIconEnter = (event) => {
		if (!user) {
			return
		}
		clearTimeout(popoverTimeoutRef.current)
		setReactionAnchorEl(event.currentTarget)
	}

	const handleReactionIconLeave = () => {
		popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 1000)
	}

	const handlePopoverEnter = () => clearTimeout(popoverTimeoutRef.current)

	const handlePopoverLeave = () => {
		popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 300)
	}

	const handleReactionSelect = (reactionType) => {
		const reaction = reactionType === currentReaction ? null : reactionType
		reactPost({ postId: post.id, type: reaction })
		setReactionAnchorEl(null)
	}

	if (isFetching) {
		return <CircularProgress size={20} />
	}
	const currentReaction = data.reactionType
	const currentReactionObj = reactions.find(
		(r) => r.label === currentReaction
	)

	return (
		<Stack
			onMouseEnter={handleReactionIconEnter}
			onMouseLeave={handleReactionIconLeave}
			direction="row"
			alignItems="center"
		>
			<IconButton
				size="small"
				sx={{
					color: currentReactionObj
						? currentReactionObj.color
						: 'text.primary'
				}}
				disabled={!user}
			>
				{currentReactionObj ? (
					<currentReactionObj.icon sx={{ width: 20, height: 20 }} />
				) : (
					<ThumbUpOutlined sx={{ width: 20, height: 20 }} />
				)}
			</IconButton>
			<Typography variant="body2">{data.reactionCount}</Typography>
			<Popover
				open={Boolean(reactionAnchorEl)}
				anchorEl={reactionAnchorEl}
				onClose={() => setReactionAnchorEl(null)}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				disableRestoreFocus
				slotProps={{
					paper: {
						onMouseEnter: handlePopoverEnter,
						onMouseLeave: handlePopoverLeave,
						sx: { p: 1 },
						elevation: 0
					}
				}}
			>
				{reactions.map((reaction) => (
					<IconButton
						key={reaction.label}
						onClick={() => handleReactionSelect(reaction.label)}
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
		</Stack>
	)
}

export default ReactButton
