import {
	Avatar,
	Box,
	Container,
	Grid2 as Grid,
	Typography,
	Paper,
	List,
	ListItem,
	Button,
	Tab,
	CircularProgress,
	Dialog,
	IconButton,
	Stack,
	Skeleton
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Link, useParams, Navigate, useNavigate } from 'react-router'
import { UpdateProfile as UpdateProfileForm } from '@/components'
import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'
import { Close, Link as LinkIcon } from '@mui/icons-material'
import { useGetUser, useGetUserStats } from '@/hooks'

const UserAvatar = ({ user }) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{ p: 0.5, position: 'relative', mb: 2 }}
			>
				<Avatar
					src={user.imageUrl}
					alt={user.fullName}
					sx={{ width: 100, height: 100 }}
				/>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="xs"
				PaperProps={{ sx: { overflow: 'visible' }, elevation: 0 }}
			>
				<Stack p={2} alignItems="center">
					<Avatar
						src={user.imageUrl}
						alt={user.fullName}
						variant="square"
						sx={{ width: 300, height: 300 }}
					/>
				</Stack>

				<Paper
					sx={{
						position: 'absolute',
						top: { xs: -48, sm: -1 },
						right: { xs: 0, sm: -48 }
					}}
				>
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
			<Paper sx={{ height: '100%' }}>
				<List sx={{ p: 2 }}>
					{!isLoaded ? (
						<CircularProgress />
					) : (!id && isSignedIn) || id === user?.id ? (
						<CurrentUserProfile />
					) : (
						<OtherUserProfile userId={id} />
					)}
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
				<Typography
					variant="h5"
					component="h2"
					fontWeight="bold"
					gutterBottom
				>
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
	const { data: user, isLoading, error } = useGetUser(userId)
	const navigate = useNavigate()

	if (isLoading) {
		return (
			<Stack width={1} alignItems="center" spacing={1}>
				<Skeleton variant="circular" height={100} width={100} />
				<Skeleton variant="text" height={30} width={160} />

				<Skeleton variant="text" height={20} width={180} />
				<Stack alignItems="center" width={1}>
					<Skeleton variant="text" height={20} width={220} />
					<Skeleton variant="text" height={20} width={180} />
				</Stack>
			</Stack>
		)
	}

	if (error?.message === 'API Error: User not found') {
		navigate('/not-found')
	}

	return (
		<>
			<ListItem sx={{ flexDirection: 'column' }}>
				<UserAvatar user={user} />
				<Typography
					variant="h5"
					component="h2"
					fontWeight="bold"
					gutterBottom
				>
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
			<Typography
				variant="h5"
				component={Link}
				to={linkTo}
				fontWeight="bold"
				sx={{
					textDecoration: 'none',
					display: 'flex',
					alignItems: 'center'
				}}
				color="textPrimary"
			>
				{value}
				<LinkIcon sx={{ fontSize: 16, ml: 1, mt: 0.5 }} />
			</Typography>
		) : (
			<Typography variant="h5" component="h2" fontWeight="bold">
				{value}
			</Typography>
		)}
	</Grid>
)

const UserMetrics = () => {
	const { id } = useParams()
	const { user } = useUser()
	const { data: metrics, isLoading, error } = useGetUserStats(id || user?.id)
	const navigate = useNavigate()

	if (error?.message === 'API Error: User not found') {
		navigate('/not-found')
	}
	return (
		<Grid size={{ xs: 12, md: 8 }}>
			<Paper sx={{ height: 1 }}>
				<Stack justifyContent="center" height={1}>
					<List sx={{ p: 2 }}>
						<ListItem>
							{isLoading ? (
								<Grid container size={12} spacing={4}>
									{Array.from({ length: 5 }).map((_, i) => (
										<Grid size={6} key={i}>
											<Skeleton
												variant="text"
												height={20}
												width="50%"
											/>
											<Skeleton
												variant="text"
												height={30}
												width="30%"
											/>
										</Grid>
									))}
								</Grid>
							) : (
								<Grid container size={12} spacing={4}>
									<MetricItem
										title="Posts Created"
										value={metrics.posts}
									/>
									<MetricItem
										title="Private Posts"
										value={metrics.privatePosts}
									/>
									<MetricItem
										title="Reactions Received"
										value={metrics.reactionsReceived}
									/>
									<MetricItem
										title="Comments Received"
										value={metrics.commentsReceived}
									/>
									{metrics.longestPost ? (
										<MetricItem
											title="Longest Post"
											value={`${metrics.longestPost.words} words`}
											isLink
											linkTo={`/posts/${metrics.longestPost.id}`}
										/>
									) : (
										<MetricItem
											title="Longest Post"
											value={0}
										/>
									)}
								</Grid>
							)}
						</ListItem>
					</List>
				</Stack>
			</Paper>
		</Grid>
	)
}
const TabNavigation = ({ value, handleChange }) => (
	<TabContext value={value}>
		<TabList
			value={value}
			sx={{ width: '100%' }}
			onChange={handleChange}
			variant="scrollable"
			aria-label="your posts"
			scrollButtons="auto"
		>
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
			<Paper>
				<List sx={{ p: 2 }}>
					<ListItem>
						<Typography
							variant="h5"
							component="h2"
							fontWeight="bold"
						>
							Your Posts
						</Typography>
					</ListItem>
					<ListItem sx={{ flexDirection: 'column' }}>
						<TabNavigation
							value={value}
							handleChange={handleChange}
						/>
					</ListItem>
				</List>
			</Paper>
		</Grid>
	)
}

const Profile = () => {
	return (
		<Container maxWidth="xl">
			<Box marginY={4}>
				<Grid container spacing={3}>
					<UserProfileCard />
					<UserMetrics />
					<UserPosts />
				</Grid>
			</Box>
		</Container>
	)
}

export default Profile
