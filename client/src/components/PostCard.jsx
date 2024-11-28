import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
	Autocomplete,
	Input,
	Tooltip
} from '@mui/material'
import {
	Delete,
	Edit,
	Cancel,
	Save,
	Refresh,
	VisibilityOff,
	Visibility,
	Lock
} from '@mui/icons-material'
import { UserAvatar, ReactButton, DeletePostDialog } from '.'
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
	const handleTagInput = (params) => {
		return (
			<TextField
				{...params}
				label="Tags"
				error={Boolean(errors.tags)}
				name="tags"
				helperText={errors.tags}
				slotProps={{
					input: {
						...params.InputProps,
						type: 'search'
					}
				}}
			/>
		)
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
				<Autocomplete
					multiple
					freeSolo
					options={[]}
					renderInput={handleTagInput}
					value={editedPost.tags.map((tag) => tag.tag.name)}
					onChange={(_, value) => {
						setEditedPost({
							...editedPost,
							tags:
								value.length > 8
									? value.slice(-8)
									: value.map((tag) => ({
											tag: { name: tag }
										}))
						})
						setErrors({ ...errors, tags: '' })
					}}
					onInputChange={(_, value) =>
						editedPost.tags.length < 8 ? value : ''
					}
					disableClearable
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
	const [showDialog, setShowDialog] = useState(false)

	const { mutate: deletePost } = useDeletePost()

	const navigate = useNavigate()

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
					user?.id === post.authorId && (
						<IconButton
							aria-label="edit"
							onClick={() => setEditing(true)}
							sx={{ color: 'white' }}
						>
							<Edit />
						</IconButton>
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
						sx={{
							objectFit: 'cover',
							width: '100%',
							height: '100%'
						}}
					/>
				</Box>

				<CardContent>
					<Typography variant="h5" gutterBottom>
						{truncate(post.title, 10)}
					</Typography>
					<Typography variant="body2" color="text.muted">
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
					<ReactButton post={post} />

					{user?.id === post.authorId && (
						<Button
							color="error"
							size="small"
							startIcon={<Delete />}
							onClick={() => setShowDialog(true)}
						>
							Delete
						</Button>
					)}
					<DeletePostDialog
						onDelete={() => deletePost(post.id)}
						open={showDialog}
						setOpen={setShowDialog}
					/>
				</Stack>
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
