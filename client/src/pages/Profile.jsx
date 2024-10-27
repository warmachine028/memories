import { Avatar, Box, Container, Grid2 as Grid, Typography, Paper, List, ListItem, Button, Tab, CircularProgress, Dialog, IconButton, Stack } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Link, useParams, Navigate } from 'react-router-dom'
import { UpdateProfileForm } from '@/components'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'
import { Close } from '@mui/icons-material'

const UserAvatar = ({ user }) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<>
			<IconButton onClick={handleOpen} sx={{ p: 0.5, position: 'relative', mb: 2 }}>
				<Avatar src={user.imageUrl} alt={user.fullName} sx={{ width: 100, height: 100 }} />
			</IconButton>
			<Dialog open={open} onClose={handleClose} maxWidth="xs" PaperProps={{ sx: { overflow: 'visible', borderRadius: 2 } }}>
				<Paper elevation={1}>
					<Stack p={2} alignItems="center">
						<Avatar src={user.imageUrl} alt={user.fullName} variant="square" sx={{ width: 300, height: 300 }} />
					</Stack>
				</Paper>
				<Paper sx={{ position: 'absolute', top: 0, right: -48 }} elevation={1}>
					<IconButton onClick={handleClose} sx={{ borderRadius: 1 }}>
						<Close />
					</IconButton>
				</Paper>
			</Dialog>
		</>
	)
}

const UserProfileCard = () => {
	/**
	 * TODO:
	 * - user is not logged in:
	 *   - route is /user -> redirect to /login [handled by AppRouter in PrivateRoute]
	 *   - route is /user/:id -> render other user profile [handled by AppRouter in PrivateRoute]
	 * - user is logged in:
	 *   - route is /user -> render current user profile
	 *   - route is /user/:id -> render other user profile
	 *     - id is same as user.id -> redirect to /user
	 *     - id is different from user.id -> render other user profile
	 */
	const { id } = useParams()
	const { user, isLoaded, isSignedIn } = useUser()

	// If the user is signed in and the id in the route is the same as the current user's id,
	// redirect to /user
	if (isSignedIn && id === user.id) {
		return <Navigate to="/user" replace />
	}

	return (
		<Grid size={{ xs: 12, md: 4 }}>
			<Paper elevation={1} sx={{ height: '100%' }}>
				<List sx={{ p: 2 }}>
					<ListItem>
						<Typography variant="h5" component="h2" fontWeight="bold">
							Profile
						</Typography>
					</ListItem>

					{!isLoaded ? <CircularProgress /> : (!id && isSignedIn) || id === user?.id ? <CurrentUserProfile /> : <OtherUserProfile userId={id} />}
				</List>
			</Paper>
		</Grid>
	)
}

const CurrentUserProfile = () => {
	const { user, isLoaded } = useUser()
	const [open, setOpen] = useState(false)

	const handleClose = () => setOpen(false)

	if (!isLoaded) {
		return <CircularProgress />
	}

	return (
		<>
			<ListItem sx={{ flexDirection: 'column' }}>
				<UserAvatar user={user} />
				<Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
					{user.fullName}
				</Typography>
				<Typography color="text.secondary.muted" variant="body2">
					{user.emailAddresses[0].emailAddress}
				</Typography>
			</ListItem>
			<ListItem sx={{ flexDirection: 'column' }}>
				<Typography variant="body2" component="p">
					{user.unsafeMetadata.bio}
				</Typography>
			</ListItem>
			<ListItem sx={{ flexDirection: 'column' }}>
				<Typography variant="body2" color="textSecondary">
					Joined: {moment(user.createdAt).format('MMMM Do YYYY')}
				</Typography>
			</ListItem>
			<ListItem sx={{ flexDirection: 'column' }}>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Edit Profile
				</Button>
			</ListItem>
			<UpdateProfileForm open={open} onClose={handleClose} />
		</>
	)
}

const OtherUserProfile = ({ userId }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Fetch user data based on userId
		// This is a placeholder for actual API call
		const fetchUser = () => {
			try {
				// Replace this with your actual API call
				setUser({
					fullName: 'Morty Smith',
					email: 'morty.smith@example.com',
					bio: 'Aww Jeez, I am so cool!',
					imageUrl: 'https://github.com/shadcn.png',
					createdAt: new Date('2024-02-14')
				})
				// const response = await fetch(`/api/users/${userId}`)
				// const data = await response.json()
				// setUser(data)
			} catch (error) {
				console.error('Error fetching user data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [userId])

	if (loading) {
		return <CircularProgress />
	}

	if (!user) {
		return (
			<ListItem>
				<Typography>User not found</Typography>
			</ListItem>
		)
	}

	return (
		<>
			<ListItem sx={{ flexDirection: 'column' }}>
				<UserAvatar user={user} />
				<Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
					{user.fullName}
				</Typography>
				<Typography color="textSecondary">{user.email}</Typography>
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
		</>
	)
}

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

const UserMetrics = ({ metrics }) => (
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
						<MetricItem title="Posts Created" value={metrics?.postsCount || 0} />
						<MetricItem title="Private Posts" value={metrics?.privatePostsCount || 0} />
						<MetricItem title="Likes Received" value={metrics?.likesReceived || 0} />
						<MetricItem title="Comments Received" value={metrics?.commentsReceived || 0} />
						<MetricItem title="Longest Post" value={`${metrics?.longestPostWords || 0} words`} isLink linkTo={`/posts/${metrics?.longestPostId}`} />
					</Grid>
				</ListItem>
			</List>
		</Paper>
	</Grid>
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

const UserPosts = () => {
	const [value, setValue] = useState('liked-posts')
	const handleChange = (_, newValue) => setValue(newValue)

	return (
		<Grid size={12}>
			<Paper elevation={1}>
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
		</Grid>
	)
}

const Profile = () => {
	const user = {
		name: 'John Doe'
	}

	return (
		<Container maxWidth="xl">
			<Box marginY={4}>
				<Grid container spacing={3}>
					{/* User Profile Card */}
					<UserProfileCard />

					{/* Metrics */}
					<UserMetrics metrics={user.metrics} />

					{/* Posts */}
					<UserPosts />
				</Grid>
			</Box>
		</Container>
	)
}

export default Profile
