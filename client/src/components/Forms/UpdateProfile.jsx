import { List, ListItem, DialogTitle, Dialog, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const UpdateProfile = ({ open, onClose, onUpdateUser }) => {
	const { user } = useSelector((state) => state.auth)
	const [editedUser, setEditedUser] = useState(user)

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setEditedUser((prevUser) => ({ ...prevUser, [name]: value }))
	}

	const handleSubmit = () => {
		onUpdateUser(editedUser)
		onClose()
	}

	return (
		<Dialog onClose={onClose} open={open} fullWidth>
			<DialogTitle>Edit Profile</DialogTitle>
			<List sx={{ pt: 0, px: 2, pb: 2 }}>
				<ListItem>
					<TextField fullWidth label="First Name" name="firstName" value={editedUser.firstName} onChange={handleInputChange} />
				</ListItem>
				<ListItem>
					<TextField fullWidth label="Last Name" name="lastName" value={editedUser.lastName} onChange={handleInputChange} />
				</ListItem>
				<ListItem>
					<TextField fullWidth label="Email" name="email" type="email" value={editedUser.email} onChange={handleInputChange} />
				</ListItem>
				<ListItem>
					<TextField fullWidth label="Bio" name="bio" multiline rows={3} value={editedUser.bio} onChange={handleInputChange} />
				</ListItem>
				<ListItem>
					<Button variant="contained" onClick={handleSubmit} fullWidth>
						Save Changes
					</Button>
				</ListItem>
			</List>
		</Dialog>
	)
}
export default UpdateProfile
