import { useState } from 'react'
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Fade,
	IconButton,
	Menu,
	MenuItem,
	Skeleton,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import {
	ThumbUp,
	Send,
	ArrowDownward,
	Cancel,
	Delete,
	MoreVert,
	Edit,
	Save
} from '@mui/icons-material'
import moment from 'moment'
import { useUser } from '@clerk/clerk-react'
import { UserAvatar } from '@/components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCreateComment, useDeleteComment, useGetComments } from '@/hooks'

const MoreButton = ({ setEditing, comment }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const { mutate: deleteComment } = useDeleteComment(comment.postId)

	const handleDelete = () => {
		deleteComment(comment.id)
		handleClose()
	}
	const handleEdit = () => {
		setEditing(true)
		handleClose()
	}
	return (
		<Box>
			<IconButton size="small" onClick={handleClick} aria-label="more">
				<MoreVert />
			</IconButton>
			<Menu
				elevation={0}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<MenuItem
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2
					}}
					onClick={handleEdit}
				>
					<Edit color="info" />
					Edit
				</MenuItem>
				<MenuItem
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2
					}}
					onClick={handleDelete}
				>
					<Delete color="error" />
					Delete
				</MenuItem>
			</Menu>
		</Box>
	)
}

const EditMoreButton = ({ setEditing }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	return (
		<Box>
			<IconButton size="small" onClick={handleClick} aria-label="more">
				<MoreVert />
			</IconButton>
			<Menu
				elevation={0}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<MenuItem
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2
					}}
					onClick={() => setEditing(false)}
				>
					<Save color="info" />
					Save
				</MenuItem>
				<MenuItem
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2
					}}
					onClick={() => setEditing(false)}
				>
					<Cancel color="error" />
					Cancel
				</MenuItem>
			</Menu>
		</Box>
	)
}



const EditComment = ({ initialState, setEditing }) => {
	const [comment, setComment] = useState(initialState)
	const handleChange = (e) => {
		setComment(e.target.value)
	}
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
		>
			<TextField
				multiline
				maxRows={3}
				fullWidth
				placeholder="Add a comment..."
				value={comment}
				onChange={handleChange}
			/>
			<EditMoreButton setEditing={setEditing} />
		</Stack>
	)
}

const Comment = ({ comment }) => {
	const { user } = useUser()
	const handleLike = () => {}
	const [editing, setEditing] = useState(false)

	return (
		<Stack direction="row" mb={2}>
			<Avatar
				src={comment.author.imageUrl}
				alt={comment.author.fullName}
				sx={{ mr: 2 }}
			/>
			<Box sx={{ flexGrow: 1 }}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography
						variant="subtitle2"
						component={Link}
						fontWeight="bold"
						to={`/user/${comment.author.id}`}
						sx={{ textDecoration: 'none' }}
						color="primary"
					>
						{comment.author.fullName}
					</Typography>
					<Typography variant="caption" color="text.secondary.muted">
						{moment(comment.createdAt).fromNow()}
					</Typography>
				</Stack>
				{editing ? (
					<EditComment
						initialState={comment.content}
						setEditing={setEditing}
					/>
				) : (
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography
							variant="body2"
							color="text.secondary"
							component="p"
							sx={{ mb: 1, overflowWrap: 'anywhere' }}
						>
							{comment.content}
						</Typography>
						{comment.optimistic ? (
							<CircularProgress size={20} />
						) : (
							comment.authorId === user.id && (
								<MoreButton
									setEditing={setEditing}
									comment={comment}
								/>
							)
						)}
					</Stack>
				)}

				<Stack direction="row" alignItems="center">
					<IconButton size="small" onClick={handleLike}>
						<ThumbUp fontSize="small" color="primary" />
					</IconButton>
					<Typography variant="caption">
						{comment.likeCount}{' '}
						{comment.likeCount === 1 ? 'like' : 'likes'}
					</Typography>
				</Stack>
			</Box>
		</Stack>
	)
}

export default Comment
