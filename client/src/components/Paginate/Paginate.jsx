import { useContext, useEffect } from 'react'
import { Root, classes } from './styles'
import { Pagination, PaginationItem, Paper, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { SnackbarContext } from '../../contexts/SnackbarContext'
import { ModeContext } from '../../contexts/ModeContext'
CircularProgress
const Paginate = ({ page }) => {
	const { openSnackBar: snackBar } = useContext(SnackbarContext)
	const { isLoading } = useSelector((state) => state.posts) // [] -> { isLoading, posts: [] }

	const dispatch = useDispatch()
	const { numberOfPages } = useSelector((state) => state.posts)

	useEffect(() => {
		const fetchPosts = async () => dispatch(getPosts(page, snackBar))
		if (page) fetchPosts()
	}, [dispatch, page])

	const { mode } = useContext(ModeContext)

	return (
		<Root className={classes.root}>
			<Paper className={`${classes.paperLight} ${mode === 'light' ? classes.paperLight : classes.paperDark}`} elevation={6}>
				{isLoading ? (
					<div className={`${classes.centerDiv}`}>
						<CircularProgress size="1rem" />
					</div>
				) : (
					<Pagination className={classes.pagination} classes={{ ul: classes.ul }} count={numberOfPages} page={Number(page) || 1} variant="outlined" color="primary" renderItem={(item) => <PaginationItem className={classes.eachPage} {...item} component={Link} to={`/posts?page=${item.page}`} />} />
				)}
			</Paper>
		</Root>
	)
}

export default Paginate
