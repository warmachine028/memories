import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	CardActionArea,
	IconButton,
	Typography,
	Button,
	Stack,
	Box,
	TextField,
	Input,
	Tooltip,
	Menu,
	MenuItem,
	CircularProgress
} from '@mui/material'
import {
	Delete,
	Edit,
	Cancel,
	Save,
	Refresh,
	VisibilityOff,
	Visibility,
	Lock,
	MoreVert
} from '@mui/icons-material'
import {
	UserAvatar,
	ReactButton,
	DeletePostDialog,
	ShareButton,
	TagsAutocomplete
} from '.'
import moment from 'moment'
import { convertToBase64, getThumbnail } from '@/lib/utils'
import { useUser } from '@clerk/clerk-react'
import { useDeletePost, useUpdatePost } from '@/hooks'

const truncate = (text, wordLimit) => {
	const words = text.split(' ')
	return words.length > wordLimit
		? `${words.slice(0, wordLimit).join(' ')} ...`
		: text
}

const MoreButton = ({ setEditing, post }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)
	const { mutate: deletePost } = useDeletePost()
	const [showDialog, setShowDialog] = useState(false)
	const handleDelete = () => {
		deletePost(post.id)
		setShowDialog(false)
		handleClose()
	}

	const handleEdit = () => {
		setEditing(true)
		handleClose()
	}

	return (
		<>
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
			<DeletePostDialog
				onDelete={handleDelete}
				open={showDialog}
				setOpen={setShowDialog}
			/>
		</>
	)
}

const EditCard = ({ post, setEditing }) => {
	const [editedPost, setEditedPost] = useState(post)
	const [imagePreview, setImagePreview] = useState(post.imageUrl)
	const initialErrors = { title: '', description: '', tags: '', media: '' }
	const { mutate: updatePost } = useUpdatePost()
	const [errors, setErrors] = useState(initialErrors)

	const handleReset = () => {
		setEditedPost(post)
		setImagePreview(post.imageUrl)
		setErrors(initialErrors)
	}
	const validateInputs = () => {
		const newErrors = {
			title: '',
			description: '',
			tags: '',
			media: ''
		}
		let valid = true

		if (editedPost.title.trim() === '') {
			newErrors.title = 'Title is required'
			valid = false
		}
		if (editedPost.description.trim() === '') {
			newErrors.description = 'Description is required'
			valid = false
		}
		if (editedPost.tags.length === 0) {
			newErrors.tags = 'At least one tag is required'
			valid = false
		}
		if (!editedPost.imageUrl) {
			newErrors.media = 'Please pick an image'
			valid = false
		}
		setErrors(newErrors)
		return valid
	}
	const handleChange = (event) => {
		const { name, value, files } = event.target
		setErrors({ ...errors, [name]: '' })
		if (name === 'visibility') {
			setEditedPost({
				...editedPost,
				visibility: value === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
			})
		} else if (name === 'media' && files && files[0]) {
			const file = files[0]
			setEditedPost({ ...editedPost, [name]: file })
			const previewUrl = URL.createObjectURL(file)
			setImagePreview(previewUrl)
			return () => URL.revokeObjectURL(previewUrl)
		} else {
			setEditedPost({ ...editedPost, [name]: value })
		}
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!validateInputs()) {
			return
		}
		try {
			updatePost({
				...editedPost,
				media: editedPost.media
					? await convertToBase64(editedPost.media)
					: editedPost.imageUrl
			})
			setEditing(false)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Card
			sx={{ position: 'relative', cursor: 'pointer', height: 'auto' }}
			component="form"
			onSubmit={handleSubmit}
			onReset={handleReset}
		>
			<CardMedia
				sx={{
					height: { md: 160, xs: 200 },
					position: 'relative',
					':hover': {
						':after': {
							height: '100%',
							content: '"Click to change image"',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'white',
							fontSize: '1.2rem',
							bgcolor: 'rgba(0, 0, 0, 0.5)',
							fontWeight: 'bold',
							cursor: 'pointer'
						}
					}
				}}
				image={imagePreview}
				onClick={() =>
					document
						.getElementById(`image-upload-${editedPost.id}`)
						.click()
				}
			/>
			<Input
				id={`image-upload-${editedPost.id}`}
				type="file"
				accept="image/*"
				sx={{ display: 'none' }}
				onChange={handleChange}
				name="media"
			/>
			<CardHeader
				avatar={
					<Tooltip title={editedPost.visibility} arrow>
						<IconButton
							aria-label="visibility"
							component="label"
							sx={{ color: 'white' }}
						>
							<Input
								type="checkbox"
								onChange={handleChange}
								sx={{ display: 'none' }}
								value={editedPost.visibility}
								name="visibility"
							/>
							{editedPost.visibility === 'PUBLIC' ? (
								<Visibility />
							) : (
								<VisibilityOff />
							)}
						</IconButton>
					</Tooltip>
				}
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					zIndex: 2,
					color: 'white',
					'& .MuiCardHeader-title': { color: 'white' },
					'& .MuiCardHeader-subheader': {
						color: 'rgba(255, 255, 255, 0.7)'
					}
				}}
				action={
					<IconButton
						aria-label="edit"
						onClick={() => setEditing(false)}
						sx={{ color: 'white' }}
					>
						<Cancel />
					</IconButton>
				}
			/>
			<CardContent sx={{ mb: 5 }}>
				<TextField
					fullWidth
					label="Title"
					name="title"
					value={editedPost.title}
					onChange={handleChange}
					error={Boolean(errors.title)}
					helperText={errors.title}
					margin="normal"
					required
				/>
				<TagsAutocomplete
					formData={editedPost}
					setFormData={setEditedPost}
					error={Boolean(errors.tags)}
				/>
				<TextField
					fullWidth
					label="Description"
					name="description"
					value={editedPost.description}
					onChange={handleChange}
					error={Boolean(errors.description)}
					helperText={errors.description}
					margin="normal"
					multiline
					maxRows={2}
					required
				/>
			</CardContent>
			<CardActions
				sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
			>
				<Stack
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					width="100%"
				>
					<Tooltip title="Reset" aria-label="Reset" arrow>
						<IconButton type="reset">
							<Refresh />
						</IconButton>
					</Tooltip>
					<Button color="primary" startIcon={<Save />} type="submit">
						Edit
					</Button>
				</Stack>
			</CardActions>
		</Card>
	)
}

const StaticCard = ({ post, setEditing }) => {
	const { user } = useUser()
	const navigate = useNavigate()
	console.log(post)
	return (
		<Card
			sx={{
				position: 'relative',
				cursor: 'pointer',
				height: 1
			}}
		>
			<CardHeader
				avatar={
					<UserAvatar
						onClick={() => navigate(`/user/${post.authorId}`)}
						user={post.author}
					/>
				}
				title={post.author.fullName}
				subheader={moment(post.createdAt).format(
					'Do MMM YYYY \\at h:mm a'
				)}
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					zIndex: 2,
					color: 'white',
					'& .MuiCardHeader-subheader': {
						color: 'rgba(255, 255, 255, 0.7)'
					}
				}}
				action={
					post.authorId === user?.id && (
						<MoreButton setEditing={setEditing} post={post} />
					)
				}
			/>
			<CardActionArea
				onClick={() =>
					!post.optimistic && navigate(`/posts/${post.id}`)
				}
				sx={{
					mb: 5,
					'&:hover': {
						'& .MuiCardActionArea-focusHighlight': {
							opacity: 0.02
						}
					}
				}}
			>
				<Box
					height={1}
					sx={{
						height: { md: 160, xs: 200 },
						position: 'relative',
						':after': {
							content: '""',
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							bgcolor: 'rgba(0, 0, 0, 0.3)',
							zIndex: 1
						}
					}}
				>
					<Box
						width={1}
						component="img"
						src={getThumbnail(post.imageUrl)}
						alt={post.title}
						height={1}
						sx={{ objectFit: 'cover' }}
					/>
				</Box>

				<CardContent>
					<Typography variant="h5" gutterBottom>
						{truncate(post.title, 10)}
					</Typography>
					<Typography variant="body2" color="text.muted">
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>

					{post.visibility === 'PRIVATE' && (
						<Box justifyContent="center" display="flex">
							<IconButton
								aria-label="visibility"
								component="label"
								color="primary"
							>
								<Lock />
							</IconButton>
						</Box>
					)}
					<Typography
						color="text.secondary"
						mt={1}
						whiteSpace="pre-line"
					>
						{truncate(post.description, 20)}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions
				sx={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0
				}}
			>
				{post.optimistic ? (
					<CircularProgress size={20} />
				) : (
					<Stack
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
						width="100%"
					>
						<ReactButton post={post} />
						<ShareButton
							url={`${window.location.href}/${post.id}`}
						/>
					</Stack>
				)}
			</CardActions>
		</Card>
	)
}

const PostCard = ({ post }) => {
	const [editing, setEditing] = useState(false)
	const props = { post, setEditing }
	return editing ? <EditCard {...props} /> : <StaticCard {...props} />
}

export default PostCard
