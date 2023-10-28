import { useRef, useContext, useEffect, useState } from 'react'
import { Root, classes } from './styles'
import { Paper, Typography, Divider, Avatar, LinearProgress, Box, Chip, Tabs, Tab, Button, Tooltip } from '@mui/material'
import { PublishedWithChanges } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import Avaatar from 'avataaars2'
import { getUserDetails, getPostsBySearch, getUserComments, getUserPostsByType } from '../../../actions/posts'
import TabPage from '../TabPage'
import { useNavigate, Link, useParams } from 'react-router-dom'

import { SwipeableViews } from 'react-swipeable-views-v18'
import { useSwipe } from '../../../hooks'
import { useTheme } from '@mui/material/styles'
import { SnackbarContext } from '../../../contexts/SnackbarContext'
import { ModeContext } from '../../../contexts/ModeContext'

const LinearProgressWithLabel = (props) => (
	<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
		<Box sx={{ width: '100%', mr: 1 }}>
			<LinearProgress variant="determinate" {...props} color="success" />
		</Box>
		<Box sx={{ minWidth: 35 }}>
			<Typography variant="body2" color="white">{`${Math.round(props.value)}%`}</Typography>
		</Box>
	</Box>
)
const TabPanel = ({ children, value, index, ...other }) => (
	<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
		{value === index && <Box>{children}</Box>}
	</div>
)

const CREATED = 'created'
const LIKED = 'liked'
const PRIVATE = 'private'

const UserDetails = ({ user }) => {
	const { openSnackBar: snackBar } = useContext(SnackbarContext)
	const { mode, modeToggle } = useContext(ModeContext)
	const theme = useTheme()
	const history = useNavigate()
	const dispatch = useDispatch()

	const [idx, setIdx] = useState(0)
	const [progress, setProgress] = useState(0)
	const [likedPage, setLikedPage] = useState(1)
	const [createdPage, setCreatedPage] = useState(1)
	const [privatePage, setPrivatePage] = useState(1)
	const [commentsPage, setCommentsPage] = useState(1)

	const { data, isLoading } = useSelector((state) => state.posts)
	const { createdPosts, createdNumberOfPages, isFetchingCreatedPosts } = useSelector((state) => state.posts)
	const { likedPosts, likedNumberOfPages, isFetchingLikedPosts } = useSelector((state) => state.posts)
	const { privatePosts, privateNumberOfPages, isFetchingPrivatePosts } = useSelector((state) => state.posts)
	const { userComments: comments, commentsNumberOfPages, isFetchingComments } = useSelector((state) => state.posts)

	const userId = user.result._id || user.result.googleId

	useEffect(() => {
		const fetchUserDetails = async () => dispatch(getUserDetails(userId, snackBar))
		fetchUserDetails()
	}, [userId])
	useEffect(() => {
		const fetchUserPostsByType = async () => dispatch(getUserPostsByType(userId, createdPage, CREATED))
		fetchUserPostsByType()
	}, [createdPage])
	useEffect(() => {
		const fetchUserPostsByType = async () => dispatch(getUserPostsByType(userId, likedPage, LIKED))
		fetchUserPostsByType()
	}, [likedPage])
	useEffect(() => {
		const fetchUserPostsByType = async () => dispatch(getUserPostsByType(userId, privatePage, PRIVATE))
		fetchUserPostsByType()
	}, [privatePage])
	useEffect(() => {
		const fetchUserComments = async () => dispatch(getUserComments(userId, commentsPage))
		fetchUserComments()
	}, [commentsPage])

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 90 ? (isLoading ? 90 : 100) : prevProgress + 10))
		}, 300)
		return () => clearInterval(timer)
	}, [isLoading])

	const openPostsWithTag = (tag) => {
		dispatch(getPostsBySearch({ tags: tag }))
		history(`/posts/search?searchQuery=none&tags=${tag}`)
	}

	const { postsCreated, postsLiked, privatePosts: numberOfPrivatePosts, totalLikesRecieved, longestPostWords, top5Tags, longestPostId } = data
	const labels = {
		Email: user.result.email,
		'Posts Created f': postsCreated,
		'Posts Liked': postsLiked,
		'Private Posts': numberOfPrivatePosts,
		'Liked Recived': totalLikesRecieved,
	}
	const createdProps = {
		page: createdPage,
		setPage: setCreatedPage,
		posts: createdPosts,
		numberOfPages: createdNumberOfPages,
		isLoading: isFetchingCreatedPosts,
		userId: userId,
		notDoneText: 'No Posts Created',
	}
	const likedProps = {
		page: likedPage,
		setPage: setLikedPage,
		posts: likedPosts,
		numberOfPages: likedNumberOfPages,
		isLoading: isFetchingLikedPosts,
		userId: userId,
		notDoneText: 'No Posts Liked',
	}
	const privateProps = {
		page: privatePage,
		setPage: setPrivatePage,
		posts: privatePosts,
		numberOfPages: privateNumberOfPages,
		isLoading: isFetchingPrivatePosts,
		user: userId,
		notDoneText: 'No Posts Private',
	}
	const commentProps = {
		page: commentsPage,
		setPage: setCommentsPage,
		comments: comments,
		numberOfPages: commentsNumberOfPages,
		isLoading: isFetchingComments,
		user: userId,
		notDoneText: 'No Comments posted',
	}

	// change views
	const swipeableViewsRef = useRef(null)
	useSwipe(swipeableViewsRef, idx)

	return (
		<Root className={classes.root}>
			<div className={classes.userContainer}>
				<Paper className={`${classes.userIcon} ${mode === 'dark' ? classes.appBarDark : ''}`} elevation={6}>
					{user.result.avatar ? (
						<Avaatar className={classes.avatar} {...user.result.avatar} />
					) : (
						<Avatar className={classes.avatar} alt={user.result.name} src={user.result.image}>
							<Typography variant="h1" color="white">
								{user.result.name.charAt(0)}
							</Typography>
						</Avatar>
					)}
					<Button variant="contained" disabled={Boolean(user.result.googleId)} component={Link} to="/user/update" startIcon={<PublishedWithChanges />}>
						UPDATE DETAILS
					</Button>
				</Paper>
				<Paper className={`${classes.userDetails} ${mode === 'dark' ? classes.appBarDark : ''}`} elevation={6}>
					{progress < 100 || isLoading ? (
						<Box className={classes.loadingLine}>
							<Typography color="white">Loading User Details ...</Typography>
							<LinearProgressWithLabel value={progress} />
						</Box>
					) : (
						<div>
							{Object.entries(labels).map(([label, newdata]) => (
								<Box key={label}>
									<Typography color="white">
										<strong style={{ color: mode === 'dark' ? 'white' : 'black' }}>{label}: </strong>
										{newdata}
									</Typography>
									<Divider style={{ backgroundColor: mode === 'dark' ? 'darkgray' : 'black' }} />
								</Box>
							))}
							<Box>
								<Typography color="white">
									<strong className={`${mode === 'dark' ? classes.appBarDark : classes.appBarLight}`}>Longest Post Written: </strong>
									<Tooltip title="Post with longest message">
										<Link to={`/posts/${longestPostId}`} style={{ color: 'white', textDecoration: 'none' }}>{`${longestPostWords} Words`}</Link>
									</Tooltip>
								</Typography>
								<Divider style={{ backgroundColor: mode === 'dark' ? 'darkgray' : 'black' }} />
							</Box>
							<div className={classes.tagsContainer}>
								<Typography color="white" style={{ whiteSpace: 'nowrap' }}>
									<strong className={`${mode === 'dark' ? classes.appBarDark : classes.appBarLight}`}>Top 5 Tags: </strong>
								</Typography>
								<Box sx={{ marginLeft: 1 }}>{top5Tags?.length ? top5Tags.map((tag) => <Chip key={tag} label={tag} onClick={() => openPostsWithTag(tag)} className={classes.chips} />) : <Chip label="no tags found" className={classes.chips} />}</Box>
							</div>
						</div>
					)}
					<Typography variant="h5" className={classes.newUser} sx={{ display: !postsCreated && !(progress < 100 || isLoading) ? 'initial' : 'none' }}>
						🎉New User🎉
					</Typography>
				</Paper>
			</div>
			<Paper className={`${classes.loadingPaper} ${mode === 'dark' ? classes.appBarDark : ''}`} elevation={6}>
				<Box sx={{ width: '100%' }}>
					<Tabs value={idx} onChange={(_, newValue) => setIdx(newValue)} aria-label="basic tabs" variant="scrollable">
						<Tab className={`${mode === 'dark' ? classes.labeltxtColor : ''}`} label="CREATED" />
						<Tab className={`${mode === 'dark' ? classes.labeltxtColor : ''}`} label="LIKED" />
						<Tab className={`${mode === 'dark' ? classes.labeltxtColor : ''}`} label="PRIVATE" />
						<Tab className={`${mode === 'dark' ? classes.labeltxtColor : ''}`} label="COMMENTS" />
					</Tabs>
					<SwipeableViews ref={swipeableViewsRef}>
						<TabPanel value={idx} index={0} dir={theme.direction}>
							<TabPage {...createdProps} />
						</TabPanel>
						<TabPanel value={idx} index={1} dir={theme.direction}>
							<TabPage {...likedProps} />
						</TabPanel>
						<TabPanel value={idx} index={2} dir={theme.direction}>
							<TabPage {...privateProps} />
						</TabPanel>
						<TabPanel value={idx} index={3} dir={theme.direction}>
							<TabPage {...commentProps} />
						</TabPanel>
					</SwipeableViews>
				</Box>
			</Paper>
		</Root>
	)
}

export const PublicProfile = () => {
	const { id: userId } = useParams()
	const { openSnackBar: snackBar } = useContext(SnackbarContext)
	const theme = useTheme()
	const history = useNavigate()
	const dispatch = useDispatch()
	const [idx, setIdx] = useState(0)
	const [progress, setProgress] = useState(0)
	const [likedPage, setLikedPage] = useState(1)
	const [createdPage, setCreatedPage] = useState(1)
	const { data, isLoading } = useSelector((state) => state.posts)
	const { createdPosts, createdNumberOfPages, isFetchingCreatedPosts } = useSelector((state) => state.posts)
	const { likedPosts, likedNumberOfPages, isFetchingLikedPosts } = useSelector((state) => state.posts)

	useEffect(() => {
		const fetchUserDetails = async () => dispatch(getUserDetails(userId, snackBar))
		fetchUserDetails()
	}, [userId])
	useEffect(() => {
		const fetchUserPostsByType = async () => dispatch(getUserPostsByType(userId, createdPage, CREATED))
		fetchUserPostsByType()
	}, [createdPage])
	useEffect(() => {
		const fetchUserPostsByType = async () => dispatch(getUserPostsByType(userId, likedPage, LIKED))
		fetchUserPostsByType()
	}, [likedPage])

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 90 ? (isLoading ? 90 : 100) : prevProgress + 10))
		}, 300)
		return () => clearInterval(timer)
	}, [isLoading])

	// useEffect(() => {
	// 	if (userId && [user?.result._id || user?.result.googleId].includes(userId)) {
	// 		history('/user')
	// 	}
	// }, [userId, user])

	const openPostsWithTag = (tag) => {
		dispatch(getPostsBySearch({ tags: tag }))
		history(`/posts/search?searchQuery=none&tags=${tag}`)
	}

	const { email, name, postsCreated, postsLiked, totalLikesRecieved, longestPostWords, top5Tags, longestPostId } = data

	const labels = {
		Name: name,
		Email: email,
		'Posts Created': postsCreated,
		'Posts Liked': postsLiked,
		'Liked Recived': totalLikesRecieved,
	}
	const createdProps = {
		page: createdPage,
		setPage: setCreatedPage,
		posts: createdPosts,
		numberOfPages: createdNumberOfPages,
		isLoading: isFetchingCreatedPosts,
		userId: userId,
		notDoneText: 'No Posts Created',
	}
	const likedProps = {
		page: likedPage,
		setPage: setLikedPage,
		posts: likedPosts,
		numberOfPages: likedNumberOfPages,
		isLoading: isFetchingLikedPosts,
		userId: userId,
		notDoneText: 'No Posts Liked',
	}

	// change views
	const swipeableViewsRef = useRef(null)
	useSwipe(swipeableViewsRef, idx)
	const { mode, modeToggle } = useContext(ModeContext)

	return (
		<Root className={classes.root}>
			<div className={classes.userContainer}>
				<Paper className={`${classes.userIcon} ${mode === 'dark' ? classes.appBarDark : classes.appBarLight}`} elevation={6}>
					{progress < 100 || isLoading ? (
						<Avatar className={classes.avatar} />
					) : data.avatar ? (
						<Avaatar className={classes.avatar} {...data.avatar} />
					) : (
						<Avatar className={classes.avatar} alt={data.name} src={data.image}>
							<Typography variant="h1" color="white">
								{data.name.charAt(0)}
							</Typography>
						</Avatar>
					)}
				</Paper>
				<Paper className={`${classes.userDetails} ${mode === 'dark' ? classes.appBarDark : classes.appBarLight}`} style={{ color: mode === 'dark' ? 'white' : 'black' }} elevation={6}>
					{progress < 100 || isLoading ? (
						<Box className={classes.loadingLine}>
							<Typography color="white">Loading User Details ...</Typography>
							<LinearProgressWithLabel value={progress} />
						</Box>
					) : (
						<div>
							{Object.entries(labels).map(([label, labelData]) => (
								<Box key={label}>
									<Typography color="white">
										<strong style={{ color: mode === 'dark' ? 'white' : 'black' }}>{label}: </strong>
										{labelData}
									</Typography>
									<Divider style={{ backgroundColor: mode === 'dark' ? 'darkgray' : 'black' }} />
								</Box>
							))}
							<Box>
								<Typography color="white">
									<strong style={{ color: mode === 'dark' ? 'white' : 'black' }}>Longest Post Written: </strong>
									<Tooltip title="Post with longest message">
										<Link to={`/posts/${longestPostId}`} style={{ color: 'white', textDecoration: 'none' }}>{`${longestPostWords} Words`}</Link>
									</Tooltip>
								</Typography>
								<Divider style={{ backgroundColor: mode === 'dark' ? 'darkgray' : 'black' }} />
							</Box>
							<div className={classes.tagsContainer}>
								<Typography color="white" style={{ whiteSpace: 'nowrap' }}>
									<strong style={{ color: mode === 'dark' ? 'white' : 'black' }}>Top 5 Tags: </strong>
								</Typography>
								<Box sx={{ marginLeft: 1 }}>{top5Tags.length ? top5Tags.map((tag) => <Chip key={tag} label={tag} onClick={() => openPostsWithTag(tag)} className={classes.chips} />) : <Chip label="no tags found" className={classes.chips} />}</Box>
							</div>
						</div>
					)}
					<Typography variant="h5" className={classes.newUser} sx={{ display: !postsCreated && !(progress < 100 || isLoading) ? 'initial' : 'none' }}>
						🎉New User🎉
					</Typography>
				</Paper>
			</div>
			<Paper className={`${classes.loadingPaper} ${mode === 'dark' ? classes.appBarDark : classes.appBarLight}`} elevation={6}>
				<Box sx={{ width: '100%' }}>
					<Tabs value={idx} onChange={(_, newValue) => setIdx(newValue)} aria-label="basic tabs">
						<Tab label="CREATED" />
						<Tab label="LIKED" />
					</Tabs>
					<SwipeableViews ref={swipeableViewsRef}>
						<TabPanel value={idx} index={0} dir={theme.direction}>
							<TabPage {...createdProps} />
						</TabPanel>
						<TabPanel value={idx} index={1} dir={theme.direction}>
							<TabPage {...likedProps} />
						</TabPanel>
					</SwipeableViews>
				</Box>
			</Paper>
		</Root>
	)
}
export default UserDetails
