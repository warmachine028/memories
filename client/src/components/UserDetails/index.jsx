import { useEffect } from 'react'
import { Root, classes } from './styles'
import { Paper, Typography, CircularProgress, Divider, Avatar } from '@mui/material'
// import { Button, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Avaatar from 'avataaars'
import { getUserDetails } from '../../actions/posts'

const UserDetails = ({ user }) => {
	const { data, isLoading } = useSelector((state) => state.posts)
	const { postsCreated, postsLiked, privatePosts, totalLikesRecieved, longestPostWords } = data

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getUserDetails(user.result._id || user.result.googleId))
	}, [user])

	return (
		<Root className={classes.root}>
			<div className={classes.userContainer}>
				<Paper className={classes.userIcon} elevation={6}>
					{user.result.avatar ? (
						<Avaatar className={classes.avatar} avatarStyle="Square" {...user.result.avatar} />
					) : (
						<Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>
							<Typography variant="h1" style={{ color: 'white' }}>
								{user.result.name.charAt(0)}
							</Typography>
						</Avatar>
					)}
				</Paper>
				<Paper className={classes.userDetails} elevation={6}>
					<div>
						<Typography style={{ color: 'white' }}>
							<strong style={{ color: 'black' }}>Email: </strong>
							{user.result.email}
						</Typography>
						<Divider />
						<Typography style={{ color: 'white' }}>
							<strong style={{ color: 'black' }}>Posts Created: </strong>
							{isLoading ? <CircularProgress size="1rem" /> : postsCreated}
						</Typography>
						<Divider />
						<Typography style={{ color: 'white' }}>
							<strong style={{ color: 'black' }}>Posts Liked: </strong>
							{isLoading ? <CircularProgress size="1rem" /> : postsLiked}
						</Typography>
						<Divider />
						<Typography style={{ color: 'white' }}>
							<strong style={{ color: 'black' }}>Private Posts: </strong>
							{isLoading ? <CircularProgress size="1rem" /> : privatePosts}
						</Typography>
						<Divider />
						<Typography style={{ color: 'white' }}>
							<strong style={{ color: 'black' }}>Likes Recived: </strong>
							{isLoading ? <CircularProgress size="1rem" /> : totalLikesRecieved}
						</Typography>
						<Divider />
						<Typography style={{ color: 'white' }}>
							<strong style={{ color: 'black' }}>Longest Post Written: </strong>
							{isLoading ? <CircularProgress size="1rem" /> : `${longestPostWords} Words`}
						</Typography>
					</div>
				</Paper>
			</div>
		</Root>
	)
}

export default UserDetails

// import Post from '../Posts/Post/Post'
// import { posts } from '../../temp'
// import ChipInput from '../ChipInput/ChipInput'
// import PostsByUser from './PostsByUser'
// import PostsLikedByUser from './PostsLikedByUser'

// const getTop5Tags = (tags) => {
// 	let frequency = {}
// 	tags.forEach((tag) => (frequency[tag] = 0))
// 	const uniques = tags.filter((tag) => ++frequency[tag] == 1)
// 	uniques.sort((self, other) => frequency[self] - frequency[other])
// 	return uniques.splice(0, 5)
// }
/*
<div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
<Typography style={{ color: 'white', width: '100%' }}>
<Divider />
								<strong style={{ color: 'black' }}>Top 5 Tags: </strong>
							</Typography>
							<ChipInput
								style={{ marginLeft: 10 }}
								chipRenderer={({ value, isDisabled, isReadOnly, className }, key) => (
									<Chip
										key={key}
										className={className}
										style={{
											pointerEvents: isDisabled || isReadOnly ? 'none' : undefined,
										}}
										label={value}
									/>
								)}
								readOnly
								disableUnderline
								value={getTop5Tags(
									[].concat.apply(
										[],
										posts.map(({ tags }) => tags)
									)
								)}
							/>
						</div>


			{/* <PostsByUser user={user}/>
			<PostsLikedByUser user={user}/>

*/
