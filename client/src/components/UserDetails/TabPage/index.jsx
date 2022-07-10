import { useEffect, useState } from 'react'
import { Root, classes } from './styles'
import { Typography, Grid, Pagination, Skeleton } from '@mui/material'
import { LoadingCard, PostCard } from '../Cards'
import { useDispatch } from 'react-redux'

// import { posts } from '../../../temp'
// const isLoading = false
// const numberOfPages = 10

const TabPage = (props) => {
	const { posts, numberOfPages, isLoading, notDoneText, page, setPage, userId } = props
	return (
		<Root className={classes.root}>
			<div className={classes.tab}>
				<div style={{ width: '100%' }}>
					{!isLoading && !posts.length ? (
						<Typography gutterBottom variant="h6" className={classes.noPostsLiked}>
							{notDoneText}
						</Typography>
					) : (
						<Grid className={classes.container} container spacing={3}>
							{isLoading ? [...Array(10).keys()].map((key) => <LoadingCard key={key} />) : posts.map((post, key) => <PostCard key={key} post={post} userId={userId} />)}
						</Grid>
					)}
				</div>
				{isLoading ? <Skeleton height={30} width={310} animation="pulse" variant="rectangular" /> : <Pagination count={numberOfPages || 0} color="primary" page={page} onChange={(_, page) => setPage(page)} />}
			</div>
		</Root>
	)
}

export default TabPage
