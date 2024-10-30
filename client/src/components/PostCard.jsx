import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
	Typography,
	Button,
	Popover,
	Paper,
	Stack,
	Box,
	Fade,
	CircularProgress,
	TextField,
	Autocomplete,
	Input,
	Tooltip,
	CardActionArea
} from '@mui/material'
import {
	ThumbUp,
	Delete,
	Favorite,
	EmojiEmotions,
	SentimentVeryDissatisfied,
	Mood,
	SentimentDissatisfied,
	ThumbUpOutlined,
	Edit,
	Cancel,
	Save,
	Refresh,
	VisibilityOff,
	Visibility,
	Lock
} from '@mui/icons-material'
import { UserAvatar, Image } from '.'
import moment from 'moment'
import { convertToBase64 } from '@/lib/utils'
import { useUser } from '@clerk/clerk-react'
import { useDeletePost, useUpdatePost } from '@/hooks'

const reactions = [
	{ icon: ThumbUp, label: 'Like', color: '#2196f3' },
	{ icon: Favorite, label: 'Love', color: '#e91e63' },
	{ icon: EmojiEmotions, label: 'Haha', color: '#ffc107' },
	{ icon: SentimentVeryDissatisfied, label: 'Sad', color: '#607d8b' },
	{ icon: Mood, label: 'Wow', color: '#4caf50' },
	{ icon: SentimentDissatisfied, label: 'Angry', color: '#ff5722' }
]

const PostCard = ({ post }) => {
	const { user } = useUser()
	const [editing, setEditing] = useState(false)
	const [editedPost, setEditedPost] = useState(post)
	const initialErrors = { title: '', description: '', tags: '', media: '' }
	const { mutate: deletePost, isPending: isDeleting } = useDeletePost()
	const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()

	const [reactionAnchorEl, setReactionAnchorEl] = useState(null)
	const [currentReaction, setCurrentReaction] = useState(
		post.reactions[0]?.reactionType
	)
	const [imagePreview, setImagePreview] = useState(post.imageUrl)
	const [errors, setErrors] = useState(initialErrors)

	const popoverTimeoutRef = useRef(null)
	const navigate = useNavigate()

	const handleReactionIconEnter = (event) => {
		if (!user) {
			return
		}
		clearTimeout(popoverTimeoutRef.current)
		setReactionAnchorEl(event.currentTarget)
	}

	const handleReactionIconLeave = () =>
		(popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 1000))

	const handlePopoverEnter = () => clearTimeout(popoverTimeoutRef.current)

	const handlePopoverLeave = () =>
		(popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 300))

	const handleReactionSelect = (reaction) => {
		setCurrentReaction(reaction === currentReaction ? null : reaction)
		setReactionAnchorEl(null)
	}

	const handleChange = (event) => {
		const { name, value, files } = event.target
		setErrors({ ...errors, [name]: '' })

		if (name === 'title' && value.length > 30) {
			setErrors({
				...errors,
				title: 'Title must be less than 30 characters'
			})
		} else if (name === 'visibility') {
			setEditedPost({
				...editedPost,
				visibility: value === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
			})
		} else if (name === 'description' && value.length > 150) {
			setErrors({
				...errors,
				description: 'Description must be less than 150 characters'
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

	const validateInputs = () => {
		const newErrors = { title: '', description: '', tags: '', media: '' }
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

	const handleSubmit = async () => {
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

	const handleReset = () => {
		setEditedPost(post)
		setImagePreview(post.imageUrl)
		setErrors({ title: '', description: '', tags: '', media: '' })
	}

	const handleTagInput = (params) => {
		return (
			<TextField
				{...params}
				label="Tags"
				error={Boolean(errors.tags)}
				name="tags"
				slotProps={{
					input: { ...params.InputProps, type: 'search' }
				}}
			/>
		)
	}
	const truncate = (text, wordLimit) => {
		const words = text.split(' ')
		if (words.length > wordLimit) {
			return `${words.slice(0, wordLimit).join(' ')} ...`
		}
		return text
	}
	return (
		<Fade in timeout={500} unmountOnExit>
			{editing ? (
				<Card
					sx={{
						position: 'relative',
						cursor: 'pointer',
						height: 'auto'
					}}
					elevation={1}
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
								.getElementById(`image-upload-${post.id}`)
								.click()
						}
					/>
					<Input
						id={`image-upload-${post.id}`}
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
								onClick={() => setEditing(!editing)}
								sx={{ color: 'white' }}
							>
								<Cancel />
							</IconButton>
						}
					/>
					<CardContent sx={{ mb: 5 }}>
						<TextField //
							fullWidth
							label="Title"
							name="title"
							value={editedPost.title}
							onChange={handleChange}
							error={Boolean(errors.title)}
							helperText={errors.title}
							margin="normal"
						/>
						<Autocomplete
							multiple
							freeSolo
							options={[]} // You might want to provide a list of suggested tags here
							renderInput={handleTagInput}
							value={editedPost.tags.map((tag) => tag.tag.name)}
							onChange={(_, value) => {
								setEditedPost((prevPost) => ({
									...prevPost,
									tags:
										value.length > 8
											? value.slice(-8)
											: value.map((tag) => ({
													tag: { name: tag }
												}))
								}))
								setErrors({ ...errors, tags: '' })
							}}
							onInputChange={(_, value) =>
								editedPost.tags.length < 8 ? value : ''
							}
							disableClearable
						/>
						<TextField //
							fullWidth
							label="Description"
							name="description"
							value={editedPost.description}
							onChange={handleChange}
							error={Boolean(errors.description)}
							helperText={errors.description}
							margin="normal"
							multiline
							rows={2}
						/>
					</CardContent>
					<CardActions
						sx={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0
						}}
					>
						<Stack
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
							width="100%"
						>
							<Tooltip title="Reset" aria-label="Reset" arrow>
								<IconButton type="reset" onClick={handleReset}>
									<Refresh />
								</IconButton>
							</Tooltip>
							<Button
								color="primary"
								startIcon={
									isUpdating ? (
										<CircularProgress size={20} />
									) : (
										<Save />
									)
								}
								onClick={handleSubmit}
								disabled={isUpdating}
							>
								Edit
							</Button>
						</Stack>
					</CardActions>
				</Card>
			) : (
				<Card
					sx={{
						position: 'relative',
						cursor: 'pointer',
						height: '100%'
					}}
					elevation={1}
				>
					<CardHeader
						avatar={
							<UserAvatar
								onClick={() =>
									navigate(`/user/${post.authorId}`)
								}
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
							'& .MuiCardHeader-title': { color: 'white' },
							'& .MuiCardHeader-subheader': {
								color: 'rgba(255, 255, 255, 0.7)'
							}
						}}
						action={
							user?.id === post.authorId && (
								<IconButton
									aria-label="edit"
									onClick={() => setEditing(!editing)}
									sx={{ color: 'white' }}
								>
									<Edit />
								</IconButton>
							)
						}
					/>
					<CardActionArea
						onClick={() => navigate(`/posts/${post.id}`)}
						sx={{ mb: 5 }}
					>
						<Image
							publicId={post.imageUrl.split('/').pop()}
							alt={post.title}
							width={1920}
							height={1080}
							sx={{
								height: { md: 160, xs: 200 },
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
						/>

						<CardContent>
							<Typography variant="h5" gutterBottom>
								{truncate(post.title, 10)}
							</Typography>
							<Typography
								variant="body2"
								color="text.muted"
							>
								{post.tags.map(({ tag }) => `#${tag.name} `)}
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
							<Typography color="text.secondary" mt={1}>
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
						<Stack
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
							width="100%"
						>
							<Box
								onMouseEnter={handleReactionIconEnter}
								onMouseLeave={handleReactionIconLeave}
							>
								<IconButton
									size="small"
									sx={{
										color: currentReaction
											? currentReaction.color
											: 'text.primary'
									}}
									disabled={!user}
								>
									{currentReaction ? (
										<currentReaction.icon />
									) : (
										<ThumbUpOutlined />
									)}
									{post.reactionCount || ''}
								</IconButton>
							</Box>

							{user?.id === post.authorId && (
								<Button //
									color="error"
									startIcon={
										isDeleting ? (
											<CircularProgress size={20} />
										) : (
											<Delete />
										)
									}
									onClick={() => deletePost(editedPost.id)}
									disabled={isDeleting}
								>
									Delete
								</Button>
							)}
						</Stack>
						<Popover
							open={Boolean(reactionAnchorEl)}
							anchorEl={reactionAnchorEl}
							onClose={() => setReactionAnchorEl(null)}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							transformOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							disableRestoreFocus
							slotProps={{
								paper: {
									onMouseEnter: handlePopoverEnter,
									onMouseLeave: handlePopoverLeave
								}
							}}
						>
							<Paper sx={{ p: 1 }}>
								{reactions.map((reaction) => (
									<IconButton
										key={reaction.label}
										onClick={() =>
											handleReactionSelect(reaction)
										}
										sx={{
											color:
												reaction === currentReaction
													? 'white'
													: reaction.color,
											bgcolor:
												reaction === currentReaction
													? reaction.color
													: 'transparent'
										}}
									>
										<reaction.icon />
									</IconButton>
								))}
							</Paper>
						</Popover>
					</CardActions>
				</Card>
			)}
		</Fade>
	)
}

export default PostCard
