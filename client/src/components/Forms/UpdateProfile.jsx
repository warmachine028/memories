import { useUser } from '@clerk/clerk-react'
import { List, ListItem, DialogTitle, Dialog, TextField, Button } from '@mui/material'
import { useState } from 'react'

const UpdateProfile = ({ open, onClose, onUpdateUser }) => {
	const { user } = useUser()
	const [editedUser, setEditedUser] = useState(user)

	const handleInputChange = (e) => setEditedUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))

	const handleSubmit = () => {
		onUpdateUser(editedUser)
		onClose()
	}

	return (
		<Dialog onClose={onClose} open={open} fullWidth>
			<DialogTitle>Edit Profile</DialogTitle>
			<List sx={{ p: 2 }}>
				<ListItem>
					<TextField fullWidth label="First Name" name="firstName" value={editedUser.firstName} onChange={handleInputChange} />
				</ListItem>
				<ListItem>
					<TextField fullWidth label="Last Name" name="lastName" value={editedUser.lastName} onChange={handleInputChange} />
				</ListItem>
				<ListItem>
					<TextField fullWidth label="Email" name="email" type="email" value={editedUser.emailAddresses[0].emailAddress} onChange={handleInputChange} />
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
