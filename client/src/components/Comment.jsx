import { useState } from 'react'
import {
	Box,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import { Cancel, Delete, MoreVert, Edit, Save } from '@mui/icons-material'
import moment from 'moment'
import { useUser } from '@clerk/clerk-react'
import { LikeButton, UserAvatar } from '@/components'
import { Link, useNavigate } from 'react-router'
import { useDeleteComment, useUpdateComment } from '@/hooks'
import { DeleteCommentDialogue } from './dialogues'

const MoreButton = ({ setEditing, comment }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const { mutate: deleteComment } = useDeleteComment(comment.postId)

	const [showDialog, setShowDialog] = useState(false)

	const handleDelete = () => {
		deleteComment(comment.id)
		setShowDialog(false)
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
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<MenuItem
					sx={{
						display: 'flex',
						alignItems: 'center',
						fontSize: 'small',
						gap: 1
					}}
					onClick={handleEdit}
				>
					<Edit color="info" fontSize="small" />
					Edit
				</MenuItem>
				<MenuItem
					sx={{
						display: 'flex',
						alignItems: 'center',
						fontSize: 'small',
						gap: 1
					}}
					onClick={() => setShowDialog(true)}
				>
					<Delete color="error" fontSize="small" />
					Delete
				</MenuItem>
			</Menu>
			<DeleteCommentDialogue
				onDelete={handleDelete}
				open={showDialog}
				setOpen={setShowDialog}
			/>
		</Box>
	)
}

const EditMoreButton = ({ setEditing, handleEdit }) => {
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
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<MenuItem
					sx={{
						display: 'flex',
						alignItems: 'center',
						fontSize: 'small',
						gap: 1
					}}
					onClick={handleEdit}
				>
					<Save color="info" fontSize="small" />
					Save
				</MenuItem>
				<MenuItem
					sx={{
						display: 'flex',
						alignItems: 'center',
						fontSize: 'small',
						gap: 1
					}}
					onClick={() => setEditing(false)}
				>
					<Cancel color="error" fontSize="small" />
					Cancel
				</MenuItem>
			</Menu>
		</Box>
	)
}

const EditComment = ({ comment, setEditing }) => {
	const [content, setContent] = useState(comment.content)
	const handleChange = (e) => setContent(e.target.value)
	const { mutate: updateComment } = useUpdateComment(comment.postId)
	const handleEdit = () => {
		updateComment({ ...comment, content })
		setEditing(false)
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
				size="small"
				fullWidth
				placeholder="Add a comment..."
				value={content}
				onChange={handleChange}
			/>
			<EditMoreButton setEditing={setEditing} handleEdit={handleEdit} />
		</Stack>
	)
}

const Comment = ({ comment }) => {
	const { user } = useUser()
	const [editing, setEditing] = useState(false)
	const navigate = useNavigate()

	return (
		<Stack direction="row" mb={1} gap={1} alignItems="center">
			<UserAvatar
				user={comment.author}
				onClick={() => navigate('/user')}
			/>
			<Box flexGrow={1}>
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
					<EditComment setEditing={setEditing} comment={comment} />
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
							comment.authorId === user?.id && (
								<MoreButton
									setEditing={setEditing}
									comment={comment}
								/>
							)
						)}
					</Stack>
				)}
				{!comment.optimistic && <LikeButton commentId={comment.id} />}
			</Box>
		</Stack>
	)
}

export default Comment
