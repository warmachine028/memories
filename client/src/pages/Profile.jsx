import { Avatar, Box, Container, Grid2 as Grid, Typography, Paper, List, ListItem, Button, Tab } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { UpdateProfile } from '@/components/Forms'
import { openSnackbar } from '@/reducers/notif'

// Mock user data (replace with actual data fetching logic)
const user = {
	metrics: {
		postsCount: 42,
		longestPostWords: 1500,
		longestPostId: 'abc123',
		likesReceived: 256,
		commentsReceived: 128,
		privatePostsCount: 5
	}
}

const Profile = () => {
	const dispatch = useDispatch()
	const { user: currentUser } = useSelector((state) => state.auth)
	const { image, email, firstName, lastName, bio, created_at } = currentUser
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
									<Avatar src={image} alt={`${firstName} ${lastName}`} sx={{ width: 100, height: 100, mb: 2 }} />
									<Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
										{firstName} {lastName}
									</Typography>
									<Typography color="textSecondary">{email}</Typography>
								</ListItem>
								<ListItem sx={{ flexDirection: 'column' }}>
									<Typography variant="body2" component="p">
										{bio}
									</Typography>
								</ListItem>
								<ListItem sx={{ flexDirection: 'column' }}>
									<Typography variant="body2" color="textSecondary">
										Joined: {moment(created_at).format('MMMM Do YYYY')}
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
												{user.metrics.postsCount}
											</Typography>
										</Grid>
										<Grid size={6}>
											<Typography gutterBottom>Private Posts</Typography>
											<Typography variant="h5" component="h2" fontWeight="bold">
												{user.metrics.privatePostsCount}
											</Typography>
										</Grid>

										<Grid size={6}>
											<Typography gutterBottom>Likes Received</Typography>
											<Typography variant="h5" component="h2" fontWeight="bold">
												{user.metrics.likesReceived}
											</Typography>
										</Grid>
										<Grid size={6}>
											<Typography gutterBottom>Comments Received</Typography>
											<Typography variant="h5" component="h2" fontWeight="bold">
												{user.metrics.commentsReceived}
											</Typography>
										</Grid>
										<Grid size={6}>
											<Typography gutterBottom>Longest Post</Typography>
											<Typography variant="h5" component={Link} to={`/post/${user.metrics.longestPostId}`} fontWeight="bold" sx={{ textDecoration: 'none' }} color="textPrimary">
												{user.metrics.longestPostWords} words
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
			<UpdateProfile open={open} onClose={handleClose} onUpdateUser={handleUpdateUser} />
		</Container>
	)
}

export default Profile
