import { useState, useEffect } from 'react'
import { Button, Paper, Grid, Typography, Container } from '@mui/material'
import { Shuffle } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Root, classes } from './styles'
import { updateUser } from '../../../actions/user'
import Input from '../../Input'
import { RandomAvatar } from '../../UserIcon/avatar'
import lodash from 'lodash'
import Avatar from 'avataaars'

const Update = ({ user, setUser, snackBar }) => {
	const history = useNavigate()
	const dispatch = useDispatch()
	const [showPassword, setShowPassword] = useState(false)
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
	const initialState = {
		firstName: user.result.name.split(' ')[0],
		lastName: user.result.name.split(' ')[1],
		avatar: user.result.avatar,
		email: user.result.email,
		id: user.result._id
	}
	const [formData, setFormData] = useState(initialState)
	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
	const [avatar, setAvatar] = useState(formData.avatar)

	const shuffle = () => setAvatar(RandomAvatar())
	useEffect(() => {
		setAvatar(avatar)
		setFormData({ ...formData, avatar: avatar })
	}, [avatar])

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(updateUser(formData, history, setUser, snackBar))
	}

	const prefillData = () => {
		setAvatar(initialState.avatar)
		setFormData(initialState)
	}
	return (
		<Root className={classes.root}>
			<Container component="main" maxWidth="xs">
				<Paper className={classes.paper} elevation={6} style={{ marginTop: '50px' }}>
					<Avatar className={classes.avatar} avatarStyle="Circle" {...avatar} />
					<Button name="avatar" onClick={shuffle} variant="outlined" size="small" startIcon={<Shuffle />}>
						Random
					</Button>
					<Typography variant="h5">Update Details</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={1}>
							<Input value={formData.firstName} name="firstName" label="First Name" onChange={handleChange}  half />
							<Input value={formData.lastName} name="lastName" label="Last Name" onChange={handleChange} half />
							<Input value={formData.email} name="email" label="Email Address" onChange={handleChange} type="email" />
							<Input name="prevPassword" label="Previous Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
							<Input name="newPassword" label="New Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} required={false}/>
						</Grid>
						<Button fullWidth variant="contained" color="primary" className={classes.submit} disabled={lodash.isEqual(formData, initialState) || !formData.prevPassword} type="submit">
							UPDATE
						</Button>
						<Button fullWidth variant="contained" color="success" className={classes.submit} onClick={prefillData}>
							PREFILL WITH EXISTING DETAILS
						</Button>
						<Button fullWidth className={classes.submit} onClick={() => history(-1)}>
							GO BACK
						</Button>
					</form>
				</Paper>
			</Container>
		</Root>
	)
}

export default Update
