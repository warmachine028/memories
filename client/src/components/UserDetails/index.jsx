import { useEffect, useState } from 'react'
import { Root, classes } from './styles'
import { Paper, Typography, Divider, Avatar, LinearProgress, Box, Chip, Tabs, Tab } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Avaatar from 'avataaars'
import { getUserDetails, getPostsBySearch } from '../../actions/posts'
import PostsByUser from './PostsByUser'
import PostsLikedByUser from './PostsLikedByUser'
import { useNavigate } from 'react-router-dom'

import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'

const LinearProgressWithLabel = (props) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant="determinate" {...props} color="success" />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="white">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	)
}

const UserDetails = ({ user }) => {
	const { data, isLoading } = useSelector((state) => state.posts)
	const [progress, setProgress] = useState(0)

	const theme = useTheme()
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleChangeIndex = (index) => {
		setValue(index)
	}

	const history = useNavigate()
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getUserDetails(user.result._id || user.result.googleId))
	}, [user])

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 90 ? (isLoading ? 90 : 100) : prevProgress + 10))
		}, 300)
		return () => {
			clearInterval(timer)
		}
	}, [isLoading])

	const { postsCreated, postsLiked, privatePosts, totalLikesRecieved, longestPostWords, top5Tags } = data
	const labels = {
		Email: user.result.email,
		'Posts Created': postsCreated,
		'Posts Liked': postsLiked,
		'Private Posts': privatePosts,
		'Liked Recived': totalLikesRecieved,
		'Longest Post Written': `${longestPostWords} Words`,
	}
	const openPostsWithTag = (tag) => {
		dispatch(getPostsBySearch({ tags: tag }))
		history(`/posts/search?searchQuery=none&tags=${tag}`)
	}
	return (
		<Root className={classes.root}>
			<div className={classes.userContainer}>
				<Paper className={classes.userIcon} elevation={6}>
					{user.result.avatar ? (
						<Avaatar className={classes.avatar} {...user.result.avatar} />
					) : (
						<Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>
							<Typography variant="h1" color="white">
								{user.result.name.charAt(0)}
							</Typography>
						</Avatar>
					)}
				</Paper>
				<Paper className={classes.userDetails} elevation={6}>
					{progress < 100 || isLoading ? (
						<Box className={classes.loadingLine}>
							<Typography color="white">Loading User Details ...</Typography>
							<LinearProgressWithLabel value={progress} />
						</Box>
					) : (
						<div>
							{Object.entries(labels).map(([label, data], key) => (
								<Box key={key}>
									<Typography color="white">
										<strong style={{ color: 'black' }}>{label}: </strong>
										{data}
									</Typography>
									<Divider />
								</Box>
							))}
							<div className={classes.tagsContainer}>
								<Typography color="white" style={{ whiteSpace: 'nowrap' }}>
									<strong style={{ color: 'black' }}>Top 5 Tags: </strong>
								</Typography>
								<Box sx={{ marginLeft: 1 }}>{top5Tags.length ? top5Tags.map((tag, key) => <Chip key={key} label={tag} onClick={() => openPostsWithTag(tag)} className={classes.chips} />) : <Chip label="no tags found" className={classes.chips} />}</Box>
							</div>
						</div>
					)}
					<Typography variant="h5" className={classes.newUser} sx={{ display: !postsCreated && !(progress < 100 || isLoading) ? 'initial' : 'none' }}>
						🎉New User🎉
					</Typography>
				</Paper>
			</div>
			<Paper className={classes.loadingPaper} elevation={6}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs">
						<Tab label="Created Posts" />
						<Tab label="Liked Posts" />
					</Tabs>
					<SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
						<TabPanel value={value} index={0} dir={theme.direction}>
							<PostsByUser user={user} />
						</TabPanel>
						<TabPanel value={value} index={1} dir={theme.direction}>
							<PostsLikedByUser user={user} />
						</TabPanel>
					</SwipeableViews>
				</Box>
			</Paper>
		</Root>
	)
}

const TabPanel = (props) => {
	const { children, value, index, ...other } = props

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && <Box>{children}</Box>}
		</div>
	)
}

export default UserDetails
