import {
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Collapse,
	FormControl,
	FormHelperText,
	IconButton,
	Input,
	Stack,
	TextField,
	Tooltip,
	Typography
} from '@mui/material'
import {
	AddAPhotoOutlined,
	Close,
	Visibility,
	VisibilityOff
} from '@mui/icons-material'
import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router'
import { useCreatePost } from '@/hooks'
import { convertToBase64 } from '@/lib/utils'
import { TagsAutocompleteInput } from '@/components'

const Form = () => {
	const { isLoaded } = useAuth()
	const { mutate: createPost, isLoading } = useCreatePost()
	const initialData = {
		title: '',
		description: '',
		tags: [],
		visibility: 'PUBLIC',
		media: null
	}
	const initialErrorState = {
		title: '',
		description: '',
		tags: '',
		media: ''
	}
	const [formData, setFormData] = useState(initialData)
	const [errors, setErrors] = useState(initialErrorState)
	const [preview, setPreview] = useState(null)

	const handleChange = (event) => {
		setErrors(initialErrorState)

		const { name, value, files } = event.target
		if (name === 'visibility') {
			setFormData({
				...formData,
				visibility:
					formData.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
			})
		} else if (name === 'media' && files && files[0]) {
			const file = files[0]
			setFormData({ ...formData, [name]: file })
			const reader = new FileReader()
			reader.onloadend = () => setPreview(reader.result)

			reader.readAsDataURL(file)
		} else if (name === 'tags') {
			setFormData({ ...formData, [name]: value.split(',') })
		} else {
			setFormData({ ...formData, [name]: value })
		}
	}

	const validateInputs = () => {
		const newErrors = { ...initialErrorState }
		let valid = true

		if (formData.title.trim() === '') {
			newErrors.title = 'Title is required'
			valid = false
		}
		if (formData.description.trim() === '') {
			newErrors.description = 'Description is required'
			valid = false
		}
		if (formData.tags.length === 0) {
			newErrors.tags = 'At least one tag is required'
			valid = false
		}
		if (!formData.media) {
			newErrors.media = 'Please pick an image'
			valid = false
		}
		setErrors(newErrors)
		return valid
	}

	const handleClear = () => {
		setFormData(initialData)
		setPreview(null)
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		setErrors(initialErrorState)
		if (!validateInputs()) {
			return
		}
		try {
			createPost({
				...formData,
				media: await convertToBase64(formData.media)
			})
		} catch (error) {
			console.error(error)
		} finally {
			handleClear()
		}
	}

	return (
		<Stack component="form" onSubmit={handleSubmit} spacing={1} p={2}>
			<Typography variant="h6" gutterBottom textAlign="center">
				Create a Post
			</Typography>
			<Stack spacing={1}>
				<Collapse timeout={300} in={Boolean(preview)} unmountOnExit>
					<Box position="relative" pt="50%">
						<IconButton
							size="small"
							onClick={() => {
								setFormData({ ...formData, media: null })
								setPreview(null)
							}}
							sx={{
								position: 'absolute',
								top: 8,
								right: 8,
								zIndex: 1,
								'&:hover': {
									backgroundColor: 'rgba(0, 0, 0, 0.7)'
								}
							}}
						>
							<Close fontSize="small" sx={{ color: 'white' }} />
						</IconButton>
						<Box
							component="img"
							width="100%"
							height="100%"
							sx={{ objectFit: 'cover' }}
							borderRadius={1}
							src={preview || 'https://via.placeholder.com/300'}
							alt="preview"
							position="absolute"
							top={0}
							left={0}
							right={0}
							bottom={0}
							overflow="hidden"
						/>
					</Box>
				</Collapse>
				<Stack direction="row" justifyContent="space-between">
					<Tooltip title="Add a photo" arrow>
						<IconButton component="label" size="small">
							<Input
								type="file"
								slotProps={{ input: { accept: 'image/*' } }}
								onChange={handleChange}
								sx={{ display: 'none' }}
								name="media"
							/>
							<AddAPhotoOutlined />
						</IconButton>
					</Tooltip>
					<Tooltip title={formData.visibility} arrow>
						<IconButton size="small" component="label">
							<Input
								type="checkbox"
								onChange={handleChange}
								sx={{ display: 'none' }}
								value={formData.visibility}
								name="visibility"
							/>
							{formData.visibility === 'PUBLIC' ? (
								<Visibility />
							) : (
								<VisibilityOff />
							)}
						</IconButton>
					</Tooltip>
				</Stack>
				<FormControl fullWidth error={Boolean(errors.title)}>
					<TextField
						label="Title"
						variant="outlined"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
						error={Boolean(errors.title)}
					/>
					<FormHelperText sx={{ m: 0 }}>
						{errors.title}
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth error={Boolean(errors.description)}>
					<TextField
						label="Description"
						variant="outlined"
						rows={4}
						multiline
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
						error={Boolean(errors.description)}
					/>
					<FormHelperText sx={{ m: 0 }}>
						{errors.description}
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth error={Boolean(errors.tags)}>
					<TagsAutocompleteInput
						formData={formData}
						setFormData={setFormData}
						error={Boolean(errors.tags)}
					/>
					<FormHelperText sx={{ m: 0 }}>{errors.tags}</FormHelperText>
				</FormControl>
				<FormControl fullWidth error={Boolean(errors.media)}>
					<FormHelperText sx={{ m: 0 }}>
						{errors.media}
					</FormHelperText>
				</FormControl>
			</Stack>
			<ButtonGroup
				orientation="vertical"
				fullWidth
				variant="contained"
				disabled={isLoading || !isLoaded}
			>
				<Button
					type="submit"
					endIcon={isLoading && <CircularProgress size={20} />}
				>
					Create
				</Button>
				<Button color="secondary" type="reset" onClick={handleClear}>
					Clear
				</Button>
			</ButtonGroup>
		</Stack>
	)
}

const CreatePost = () => {
	const { isSignedIn } = useAuth()

	return isSignedIn ? (
		<Form />
	) : (
		<Stack p={2} spacing={2} alignItems="center">
			<Typography component="h1" variant="body1" textAlign="center">
				Please Sign in to create a post
			</Typography>
			<Button
				component={Link}
				to="/login"
				variant="contained"
				color="secondary"
				fullWidth
			>
				Sign in
			</Button>
		</Stack>
	)
}

export default CreatePost
