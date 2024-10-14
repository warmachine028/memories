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
	const handleChange = useCallback((_, newValue) => setValue(newValue), [])
	const [open, setOpen] = useState(false)
	const handleClickOpen = useCallback(() => setOpen(true), [])
	const handleClose = useCallback(() => setOpen(false), [])

	const handleUpdateUser = useCallback(() => {
		handleClose()
		dispatch(openSnackbar({ message: 'Profile successfully updated 🎊', severity: 'success' }))
	}, [dispatch, handleClose])

	return (
		<Container maxWidth="xl">
			<Box marginY={4}>
				<Grid container spacing={3}>
					{/* User Profile Card */}
					<Grid size={{ xs: 12, md: 4 }}>
						<UserProfileCard user={user} handleClickOpen={handleClickOpen} />
					</Grid>

					{/* Metrics */}
					<Grid size={{ xs: 12, md: 8 }}>
						<UserMetrics metrics={user.metrics} />
					</Grid>

					{/* Posts */}
					<Grid size={12}>
						<UserPosts value={value} handleChange={handleChange} />
					</Grid>
				</Grid>
			</Box>
			<UpdateProfileForm open={open} onClose={handleClose} onUpdateUser={handleUpdateUser} />
		</Container>
	)
}

const UserProfileCard = ({ user, handleClickOpen }) => (
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
)

const MetricsHeader = () => (
	<ListItem>
		<Typography variant="h5" component="h2" fontWeight="bold">
			Metrics
		</Typography>
	</ListItem>
)

const MetricItem = ({ title, value, isLink, linkTo }) => (
	<Grid size={6}>
		<Typography gutterBottom>{title}</Typography>
		{isLink ? (
			<Typography variant="h5" component={Link} to={linkTo} fontWeight="bold" sx={{ textDecoration: 'none' }} color="textPrimary">
				{value}
			</Typography>
		) : (
			<Typography variant="h5" component="h2" fontWeight="bold">
				{value}
			</Typography>
		)}
	</Grid>
)

const MetricsList = ({ metrics }) => (
	<ListItem>
		<Grid container size={12} spacing={4}>
			<MetricItem title="Posts Created" value={metrics?.postsCount || 0} />
			<MetricItem title="Private Posts" value={metrics?.privatePostsCount || 0} />
			<MetricItem title="Likes Received" value={metrics?.likesReceived || 0} />
			<MetricItem title="Comments Received" value={metrics?.commentsReceived || 0} />
			<MetricItem title="Longest Post" value={`${metrics?.longestPostWords || 0} words`} isLink linkTo={`/post/${metrics?.longestPostId}`} />
		</Grid>
	</ListItem>
)

const UserMetrics = ({ metrics }) => (
	<Paper elevation={1} sx={{ height: '100%' }}>
		<List sx={{ p: 2 }}>
			<MetricsHeader />
			<MetricsList metrics={metrics} />
		</List>
	</Paper>
)

const TabNavigation = ({ value, handleChange }) => (
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
)

const UserPosts = ({ value, handleChange }) => (
	<Paper elevation={1} sx={{ height: '100%' }}>
		<List sx={{ p: 2 }}>
			<ListItem>
				<Typography variant="h5" component="h2" fontWeight="bold">
					Your Posts
				</Typography>
			</ListItem>
			<ListItem sx={{ flexDirection: 'column' }}>
				<TabNavigation value={value} handleChange={handleChange} />
			</ListItem>
		</List>
	</Paper>
)

export default Profile
