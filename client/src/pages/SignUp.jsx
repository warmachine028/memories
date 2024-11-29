import {
	Container,
	Button,
	Paper,
	TextField,
	Typography,
	Avatar,
	Grid2 as Grid,
	Stack,
	Divider,
	FormControl,
	FormHelperText
} from '@mui/material'
import { Link, useNavigate } from 'react-router'
import { LockOutlined } from '@mui/icons-material'
import { useSignUp } from '@clerk/clerk-react'
import { OAuthButtons } from '@/components'
import { useState } from 'react'

const NameFields = ({ formData, errors, handleChange }) => (
	<Grid container size={{ xs: 12, md: 12, xl: 3 }} spacing={1}>
		<Grid size={{ xs: 12, md: 6 }}>
			<FormControl error={Boolean(errors.firstName)} fullWidth>
				<TextField
					label="First Name"
					variant="outlined"
					name="firstName"
					type="text"
					autoComplete="given-name"
					required
					value={formData.firstName}
					onChange={handleChange}
					error={Boolean(errors.firstName)}
				/>
				<FormHelperText sx={{ m: 0 }}>
					{errors.firstName}
				</FormHelperText>
			</FormControl>
		</Grid>
		<Grid size={{ xs: 12, md: 6 }}>
			<FormControl error={Boolean(errors.lastName)} fullWidth>
				<TextField
					label="Last Name"
					variant="outlined"
					name="lastName"
					type="text"
					autoComplete="family-name"
					value={formData.lastName}
					onChange={handleChange}
					error={Boolean(errors.lastName)}
				/>
				<FormHelperText sx={{ m: 0 }}>{errors.lastName}</FormHelperText>
			</FormControl>
		</Grid>
	</Grid>
)

const Form = () => {
	const initialState = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		repeatPassword: ''
	}
	const initialErrorState = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		repeatPassword: '',
		clerkError: ''
	}
	const { isLoaded, signUp } = useSignUp()
	const [formData, setFormData] = useState(initialState)
	const [errors, setErrors] = useState(initialErrorState)
	const navigate = useNavigate()

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const validateInputs = () => {
		const newErrors = { ...initialErrorState }
		let valid = true

		// Name validation
		const nameRegex = /^[A-Za-z]+$/
		if (!nameRegex.test(formData.firstName)) {
			newErrors.firstName = 'Name must contain only letters'
			valid = false
		}
		if (formData.firstName.length < 1) {
			newErrors.firstName = 'Name must be at least 1 character'
			valid = false
		}
		if (!nameRegex.test(formData.lastName)) {
			newErrors.lastName = 'Name must contain only letters'
			valid = false
		}

		// Password validation
		if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters long'
			valid = false
		}
		if (formData.password !== formData.repeatPassword) {
			newErrors.repeatPassword = 'Passwords do not match'
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
		if (!isLoaded) {
			return
		}
		try {
			await signUp.create({
				firstName: formData.firstName,
				lastName: formData.lastName,
				emailAddress: formData.email,
				password: formData.password
			})
			await signUp.prepareVerification({ strategy: 'email_code' })
			navigate('/verify-email')
		} catch (error) {
			setErrors({
				...initialErrorState,
				clerkError: error.errors[0].longMessage
			})
		}
	}

	return (
		<Stack
			component="form"
			onSubmit={handleSubmit}
			alignItems="center"
			spacing={1}
		>
			<Avatar sx={{ bgcolor: { xs: 'secondary.main' } }}>
				<LockOutlined />
			</Avatar>
			<Typography variant="h5">JOIN US NOW</Typography>
			<NameFields
				formData={formData}
				errors={errors}
				handleChange={handleChange}
			/>
			<FormControl error={Boolean(errors.email)} fullWidth>
				<TextField
					label="Email"
					variant="outlined"
					name="email"
					type="email"
					autoComplete="email"
					required
					value={formData.email}
					onChange={handleChange}
					error={Boolean(errors.email)}
				/>
				<FormHelperText sx={{ m: 0 }}>{errors.email}</FormHelperText>
			</FormControl>
			<FormControl error={Boolean(errors.password)} fullWidth>
				<TextField
					label="Password"
					variant="outlined"
					name="password"
					type="password"
					autoComplete="password"
					required
					value={formData.password}
					onChange={handleChange}
					error={Boolean(errors.password)}
				/>
				<FormHelperText sx={{ m: 0 }}>{errors.password}</FormHelperText>
			</FormControl>
			<FormControl error={Boolean(errors.repeatPassword)} fullWidth>
				<TextField
					id="repeat-password"
					label="Repeat Password"
					variant="outlined"
					name="repeatPassword"
					type="password"
					autoComplete="off"
					required
					value={formData.repeatPassword}
					onChange={handleChange}
					error={Boolean(errors.repeatPassword)}
				/>
				<FormHelperText sx={{ m: 0 }}>
					{errors.repeatPassword}
				</FormHelperText>
			</FormControl>
			<FormHelperText error sx={{ m: 0 }}>
				{errors.clerkError}
			</FormHelperText>
			<Button variant="contained" type="submit" fullWidth>
				SIGN UP
			</Button>
			<Divider textAlign="center" sx={{ width: '100%' }}>
				OR
			</Divider>
			<OAuthButtons />
			<Button fullWidth to="/login" LinkComponent={Link}>
				<Typography variant="subtitle2">
					Already have an account? Log In
				</Typography>
			</Button>
		</Stack>
	)
}

const SignUp = () => {
	return (
		<Container maxWidth="xl">
			<Stack
				alignItems="center"
				minHeight="calc(100vh - 100px)"
				justifyContent="center"
			>
				<Paper
					sx={{
						p: 2,
						width: 'calc(100vw - 20px)',
						maxWidth: 400,
						m: { sm: 'auto' }
					}}
				>
					<Form />
				</Paper>
			</Stack>
		</Container>
	)
}

export default SignUp
