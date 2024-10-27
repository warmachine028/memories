import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { List, ListItem, DialogTitle, Dialog, TextField, Button, Paper, Avatar, IconButton, Input, Stack, FormControl, FormHelperText, ButtonGroup, Grid2 as Grid, CircularProgress } from '@mui/material'
import { useStore } from '@/store'
import { AddAPhotoOutlined, Close } from '@mui/icons-material'

const UpdateProfile = ({ open, onClose: handleClose }) => {
	const { user } = useUser()
	const { openSnackbar } = useStore()
	const initialErrorState = { imageUrl: '', firstName: '', lastName: '', bio: '' }
	const initialData = { imageUrl: user.imageUrl, firstName: user.firstName, lastName: user.lastName, bio: user.unsafeMetadata.bio || '' }
	const [errors, setErrors] = useState(initialErrorState)
	const [editedUser, setEditedUser] = useState(initialData)
	const [newImage, setNewImage] = useState(null)
	const [loading, setLoading] = useState(false)
	const handleInputChange = (e) => setEditedUser({ ...editedUser, [e.target.name]: e.target.value })

	const handleImageChange = (e) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0]
			setNewImage(file)
			setEditedUser({ ...editedUser, imageUrl: URL.createObjectURL(file) })
		}
	}

	const validateInputs = () => {
		const newErrors = { ...initialErrorState }
		let valid = true

		// Name validation
		const nameRegex = /^[A-Za-z]+$/
		if (!nameRegex.test(editedUser.firstName)) {
			newErrors.firstName = 'Name must contain only letters'
			valid = false
		}
		if (editedUser.firstName.length < 1) {
			newErrors.firstName = 'Name must be at least 1 character'
			valid = false
		}
		if (editedUser.lastName && !nameRegex.test(editedUser.lastName)) {
			newErrors.lastName = 'Name must contain only letters'
			valid = false
		}
		setErrors(newErrors)
		return valid
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setErrors(initialErrorState)
		if (!validateInputs()) {
			return
		}
		setLoading(true)
		try {
			// Update user profile
			await user.update({
				firstName: editedUser.firstName,
				lastName: editedUser.lastName,
				unsafeMetadata: { ...user.unsafeMetadata, bio: editedUser.bio }
			})
			// Update profile picture if changed
			if (newImage) {
				await user.setProfileImage({ file: newImage })
			}
			handleClose()
			openSnackbar('Profile successfully updated 🎊', 'success')
		} catch (error) {
			console.error('Error updating user:', error.errors[0]?.longMessage || error.message)
			openSnackbar(error.errors[0]?.longMessage || error.message, 'error')
		} finally {
			setLoading(false)
		}
	}

	const handleReset = () => {
		setEditedUser(initialData)
		setNewImage(null)
	}

	return (
		<Dialog onClose={handleClose} open={open} fullWidth>
			<Paper component="form" onSubmit={handleSubmit}>
				<DialogTitle>Edit Profile</DialogTitle>
				<IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
					<Close />
				</IconButton>
				<List>
					<ListItem sx={{ justifyContent: 'center' }}>
						<IconButton component="label">
							<Input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
							<Avatar
								src={editedUser.imageUrl}
								alt={`${editedUser.firstName} ${editedUser.lastName}`}
								sx={{
									width: 150,
									height: 150,
									transition: 'opacity 0.3s',
									'&:hover': { opacity: 0.7 }
								}}
							/>
							<Stack
								position="absolute"
								top={0}
								left={0}
								width="100%"
								height="100%"
								alignItems="center"
								justifyContent="center"
								borderRadius="50%"
								color="white"
								sx={{
									opacity: 0,
									transition: 'opacity 0.3s',
									'&:hover': { opacity: 1 }
								}}
							>
								<AddAPhotoOutlined fontSize="large" />
							</Stack>
						</IconButton>
					</ListItem>
					<ListItem>
						<Grid width="100%" container spacing={2}>
							<Grid size={{ xs: 12, sm: 6 }}>
								<FormControl fullWidth error={Boolean(errors.firstName)}>
									<TextField label="First Name" name="firstName" value={editedUser.firstName} onChange={handleInputChange} required error={Boolean(errors.firstName)} />
									<FormHelperText>{errors.firstName}</FormHelperText>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<FormControl fullWidth error={Boolean(errors.lastName)}>
									<TextField label="Last Name" name="lastName" value={editedUser.lastName} onChange={handleInputChange} error={Boolean(errors.lastName)} />
									<FormHelperText>{errors.lastName}</FormHelperText>
								</FormControl>
							</Grid>
						</Grid>
					</ListItem>
					<ListItem>
						<FormControl fullWidth error={Boolean(errors.bio)}>
							<TextField fullWidth label="Bio" name="bio" multiline rows={3} value={editedUser.bio} onChange={handleInputChange} error={Boolean(errors.bio)} />
							<FormHelperText>{errors.bio}</FormHelperText>
						</FormControl>
					</ListItem>
					<ListItem>
						<ButtonGroup disabled={loading} fullWidth orientation="vertical">
							<FormControl fullWidth error={Boolean(errors.imageUrl)}>
								<FormHelperText>{errors.imageUrl}</FormHelperText>
							</FormControl>
							<Button variant="contained" type="submit" fullWidth endIcon={<CircularProgress size={20} color="primary.main" sx={{ display: loading ? 'inline-flex' : 'none' }} />}>
								Save Changes
							</Button>
							<Button variant="outlined" type="reset" fullWidth onClick={handleReset}>
								Reset
							</Button>
						</ButtonGroup>
					</ListItem>
				</List>
			</Paper>
		</Dialog>
	)
}

export default UpdateProfile
