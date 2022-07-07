import { useEffect, useState } from 'react'
import { Root, classes } from './styles'
import { Paper, Typography, Divider, Avatar, LinearProgress, Box, Chip } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Avaatar from 'avataaars'
import { getUserDetails } from '../../actions/posts'

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
	const { postsCreated, postsLiked, privatePosts, totalLikesRecieved, longestPostWords, top5Tags } = data
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
	const labels = {
		Email: user.result.email,
		'Posts Created': postsCreated,
		'Posts Liked': postsLiked,
		'Private Posts': privatePosts,
		'Liked Recived': totalLikesRecieved,
		'Longest Post Written': `${longestPostWords} Words`,
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
							<div style={{ display: 'flex', alignItems: 'center', marginTop: 3 }}>
								<Typography color="white" style={{ whiteSpace: 'nowrap' }}>
									<strong style={{ color: 'black' }}>Top 5 Tags: </strong>
								</Typography>
								<Box sx={{ alignItems: 'center', marginLeft: 1 }}>{top5Tags.length ? top5Tags.map((tag, key) => <Chip key={key} label={tag} style={{ background: '#ffffff70', margin: 2 }} />) : <Chip label="no tags found" style={{ background: '#ffffff70', margin: 2 }} />}</Box>
							</div>
						</div>
					)}
					{!postsCreated && !(progress < 100 || isLoading) && (
						<Typography variant="h5" color="white" style={{ margin: 'auto' }}>
							🎉New User🎉
						</Typography>
					)}
				</Paper>
			</div>
		</Root>
	)
}

export default UserDetails
