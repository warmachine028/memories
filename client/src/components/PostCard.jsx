import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Button, Popover, Paper, Stack, Box, Fade, CircularProgress, TextField, Autocomplete, InputAdornment, Input, Tooltip } from '@mui/material'
import { ThumbUp, Delete, Favorite, EmojiEmotions, SentimentVeryDissatisfied, Mood, SentimentDissatisfied, ThumbUpOutlined, Edit, Cancel, Save, Refresh, VisibilityOff, Visibility } from '@mui/icons-material'
import { UserAvatar } from '.'
import moment from 'moment'
import { getThumbnail, convertToBase64 } from '@/lib/utils'
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

	const { mutate: deletePost, isPending: isDeleting } = useDeletePost()
	const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()

	const [reactionAnchorEl, setReactionAnchorEl] = useState(null)
	const [currentReaction, setCurrentReaction] = useState(post.reactions[0]?.reactionType)

	const [errors, setErrors] = useState({ title: '', description: '', tags: '', media: '' })

	const popoverTimeoutRef = useRef(null)
	const navigate = useNavigate()

	const handleReactionIconEnter = (event) => {
		clearTimeout(popoverTimeoutRef.current)
		setReactionAnchorEl(event.currentTarget)
	}

	const handleReactionIconLeave = () => {
		popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 1000)
	}

	const handlePopoverEnter = () => {
		clearTimeout(popoverTimeoutRef.current)
	}

	const handlePopoverLeave = () => {
		popoverTimeoutRef.current = setTimeout(() => {
			setReactionAnchorEl(null)
		}, 300)
	}

	const handleReactionSelect = (reaction) => {
		setCurrentReaction(reaction === currentReaction ? null : reaction)
		setReactionAnchorEl(null)
	}

	const handleChange = (event) => {
		const { name, value, files } = event.target
		setErrors({ ...errors, [name]: '' })

		if (name === 'title' && value.length > 30) {
			setErrors({ ...errors, title: 'Title must be less than 30 characters' })
		} else if (name === 'visibility') {
			setEditedPost({ ...editedPost, visibility: value === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC' })
		} else if (name === 'description' && value.length > 150) {
			setErrors({ ...errors, description: 'Description must be less than 150 characters' })
		} else if (name === 'media' && files && files[0]) {
			const file = files[0]
			setEditedPost({ ...editedPost, [name]: file })
			const reader = new FileReader()
			reader.onloadend = () => {
				setEditedPost((prev) => ({ ...prev, imageUrl: reader.result }))
			}
			reader.readAsDataURL(file)
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
				media: editedPost.media ? await convertToBase64(editedPost.media) : editedPost.imageUrl
			})
			setEditing(false)
			setEditedPost(post)
		} catch (error) {
			console.error(error)
		}
	}

	const handleReset = () => {
		setEditedPost(post)
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

	return (
		<Fade in timeout={500} unmountOnExit>
			<Card
				sx={{
					border: (theme) => `1px solid ${theme.palette.divider}`,
					':hover': { boxShadow: (theme) => `0px 0px 10px 0px ${theme.palette.primary.main}` },
					position: 'relative'
				}}
				elevation={1}
			>
				<CardMedia
					sx={{
						height: { md: 160, xs: 200 },
						position: 'relative',
						...(!editing && {
							'&::after': {
								content: '""',
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								bgcolor: 'rgba(0, 0, 0, 0.3)',
								zIndex: 1
							}
						}),
						...(editing && {
							'&:hover': {
								'&::after': {
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
						})
					}}
					image={editing ? editedPost.imageUrl : getThumbnail(post.imageUrl)}
					onClick={() => (editing ? document.getElementById('image-upload').click() : navigate(`/post/${post.id}`))}
				/>
				<Input id="image-upload" type="file" accept="image/*" sx={{ display: 'none' }} onChange={handleChange} name="media" />
				<CardHeader
					avatar={
						editing ? (
							<Tooltip title={editedPost.visibility} arrow>
								<IconButton aria-label="visibility" component="label" sx={{ color: 'white' }}>
									<Input //
										type="checkbox"
										onChange={handleChange}
										sx={{ display: 'none' }}
										value={editedPost.visibility}
										name="visibility"
									/>
									{editedPost.visibility === 'PUBLIC' ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</Tooltip>
						) : (
							<UserAvatar onClick={() => navigate(`/user/${post.authorId}`)} user={post.author} />
						)
					}
					title={!editing && post.author.fullName}
					subheader={!editing && moment(post.createdAt).format('Do MMM YYYY \\at h:mm a')}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						zIndex: 2,
						color: 'white',
						'& .MuiCardHeader-title': { color: 'white' },
						'& .MuiCardHeader-subheader': { color: 'rgba(255, 255, 255, 0.7)' }
					}}
					action={
						user?.id === post.authorId && (
							<IconButton aria-label="edit" onClick={() => setEditing(!editing)} sx={{ color: 'white' }}>
								{editing ? <Cancel /> : <Edit />}
							</IconButton>
						)
					}
				/>
				<CardContent>
					{editing ? (
						<TextField fullWidth label="Title" name="title" value={editedPost.title} onChange={handleChange} error={!!errors.title} helperText={errors.title} margin="normal" />
					) : (
						<Typography variant="h5" gutterBottom>
							{post.title}
						</Typography>
					)}
					{editing ? (
						<Autocomplete
							multiple
							freeSolo
							options={[]} // You might want to provide a list of suggested tags here
							renderInput={handleTagInput}
							value={editedPost.tags.map((tag) => tag.tag.name)}
							onChange={(_, value) => {
								setEditedPost((prevPost) => ({
									...prevPost,
									tags: value.length > 8 ? value.slice(-8) : value.map((tag) => ({ tag: { name: tag } }))
								}))
								setErrors({ ...errors, tags: '' })
							}}
							onInputChange={(_, value) => (editedPost.tags.length < 8 ? value : '')}
							disableClearable
						/>
					) : (
						<Typography variant="body2" color="text.secondary.muted">
							{post.tags.map(({ tag }) => `#${tag.name} `)}
						</Typography>
					)}
					{editing ? (
						<TextField fullWidth label="Description" name="description" value={editedPost.description} onChange={handleChange} error={!!errors.description} helperText={errors.description} margin="normal" multiline rows={2} />
					) : (
						<Typography color="text.secondary" mt={1}>
							{post.description}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Stack flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
						{!editing ? (
							<Box onMouseEnter={handleReactionIconEnter} onMouseLeave={handleReactionIconLeave}>
								<IconButton size="small" sx={{ color: currentReaction ? currentReaction.color : 'textPrimary' }}>
									{currentReaction ? <currentReaction.icon /> : <ThumbUpOutlined />}
									{post.reactionCount || ''}
								</IconButton>
							</Box>
						) : (
							<Tooltip title="Reset" aria-label="Reset" arrow>
								<IconButton type="reset" onClick={handleReset}>
									<Refresh />
								</IconButton>
							</Tooltip>
						)}
						{user?.id === post.authorId &&
							(editing ? (
								<Button color="primary" startIcon={isUpdating ? <CircularProgress size={20} /> : <Save />} onClick={handleSubmit} disabled={isUpdating}>
									Submit
								</Button>
							) : (
								<Button color="error" startIcon={isDeleting ? <CircularProgress size={20} /> : <Delete />} onClick={() => deletePost(editedPost.id)} disabled={isDeleting}>
									Delete
								</Button>
							))}
					</Stack>
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
								onMouseLeave: handlePopoverLeave
							}
						}}
					>
						<Paper sx={{ p: 1, border: (theme) => `1px solid ${theme.palette.divider}` }}>
							{reactions.map((reaction) => (
								<IconButton
									key={reaction.label}
									onClick={() => handleReactionSelect(reaction)}
									sx={{
										color: reaction === currentReaction ? 'white' : reaction.color,
										bgcolor: reaction === currentReaction ? reaction.color : 'transparent'
									}}
								>
									<reaction.icon />
								</IconButton>
							))}
						</Paper>
					</Popover>
				</CardActions>
			</Card>
		</Fade>
	)
}

export default PostCard
