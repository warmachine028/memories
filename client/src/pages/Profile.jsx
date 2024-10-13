import { Avatar, Box, Container, Grid2 as Grid, Typography, Paper, List, ListItem, Button, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { UpdateProfileForm } from '@/components'
import { openSnackbar } from '@/reducers/notif'
import { useCallback, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Profile = () => {
	const dispatch = useDispatch()
	const { user } = useUser()
	const [value, setValue] = useState('liked-posts')
	const handleChange = (_, newValue) => setValue(newValue)
	const [open, setOpen] = useState(false)
	const handleClickOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleUpdateUser = useCallback(() => {
		handleClose()
		dispatch(openSnackbar({ message: 'Profile successfully updated 🎊', severity: 'success' }))
	}, [dispatch])

	return (
		<Container maxWidth="xl">
			<Box marginY={4}>
				<Grid container spacing={3}>
					{/* User Profile Card */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Paper elevation={1}>
							<List sx={{ p: 2 }}>
								<ListItem>
									<Typography variant="h5" component="h2" fontWeight="bold">
										Profile
									</Typography>
								</ListItem>
								<ListItem sx={{ flexDirection: 'column' }}>
									<Avatar src={user.imageUrl} alt={user.fullName} sx={{ width: 100, height: 100, mb: 2 }} />
									<Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
										{user.fullName}
									</Typography>
									<Typography color="textSecondary">{user.emailAddresses[0].emailAddress}</Typography>
								</ListItem>
								<ListItem sx={{ flexDirection: 'column' }}>
									<Typography variant="body2" component="p">
										{user.bio}
									</Typography>
								</ListItem>
								<ListItem sx={{ flexDirection: 'column' }}>
									<Typography variant="body2" color="textSecondary">
										Joined: {moment(user.createdAt).format('MMMM Do YYYY')}
									</Typography>
								</ListItem>
								<ListItem sx={{ flexDirection: 'column' }}>
									<Button variant="contained" onClick={handleClickOpen}>
										Edit Profile
									</Button>
								</ListItem>
							</List>
						</Paper>
					</Grid>

					{/* Metrics */}
					<Grid size={{ xs: 12, md: 8 }}>
						<Paper elevation={1} sx={{ height: '100%' }}>
							<List sx={{ p: 2 }}>
								<ListItem>
									<Typography variant="h5" component="h2" fontWeight="bold">
										Metrics
									</Typography>
								</ListItem>
								<ListItem>
									<Grid container size={12} spacing={4}>
										<Grid size={6}>
											<Typography gutterBottom>Posts Created</Typography>
											<Typography variant="h5" component="h2" fontWeight="bold">
												{user.metrics?.postsCount || 0}
											</Typography>
										</Grid>
										<Grid size={6}>
											<Typography gutterBottom>Private Posts</Typography>
											<Typography variant="h5" component="h2" fontWeight="bold">
												{user.metrics?.privatePostsCount || 0}
											</Typography>
										</Grid>

										<Grid size={6}>
											<Typography gutterBottom>Likes Received</Typography>
											<Typography variant="h5" component="h2" fontWeight="bold">
												{user.metrics?.likesReceived || 0}
											</Typography>
										</Grid>
										<Grid size={6}>
											<Typography gutterBottom>Comments Received</Typography>
											<Typography variant="h5" component="h2" fontWeight="bold">
												{user.metrics?.commentsReceived || 0}
											</Typography>
										</Grid>
										<Grid size={6}>
											<Typography gutterBottom>Longest Post</Typography>
											<Typography variant="h5" component={Link} to={`/post/${user.metrics?.longestPostId}`} fontWeight="bold" sx={{ textDecoration: 'none' }} color="textPrimary">
												{user.metrics?.longestPostWords || 0} words
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
							</List>
						</Paper>
					</Grid>

					{/* Posts */}
					<Grid size={12}>
						<Paper elevation={1} sx={{ height: '100%' }}>
							<List sx={{ p: 2 }}>
								<ListItem>
									<Typography variant="h5" component="h2" fontWeight="bold">
										Your Posts
									</Typography>
								</ListItem>
								<ListItem sx={{ flexDirection: 'column' }}>
									<TabContext value={value}>
										<TabList value={value} sx={{ width: '100%' }} onChange={handleChange} variant="scrollable" aria-label="your posts" scrollButtons="auto">
											<Tab label="Liked Posts" value="liked-posts" />
											<Tab label="Private Posts" value="private-posts" />
											<Tab label="Commented Posts" value="commented-posts" />
										</TabList>
										<TabPanel value="liked-posts"> No Posts Available</TabPanel>
										<TabPanel value="private-posts"> No Posts Available</TabPanel>
										<TabPanel value="commented-posts"> No Posts Available</TabPanel>
									</TabContext>
								</ListItem>
							</List>
						</Paper>
					</Grid>
				</Grid>
			</Box>
			<UpdateProfileForm open={open} onClose={handleClose} onUpdateUser={handleUpdateUser} />
		</Container>
	)
}

export default Profile
