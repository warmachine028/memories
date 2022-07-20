import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Grow, Grid } from '@mui/material'
import { Root, classes } from './styles'
import Posts from '../Posts'
import Form from '../Form/Form'
import Paginate from '../Paginate/Paginate'
import Search from '../Search/Search'

const useQuery = () => new URLSearchParams(useLocation().search)

const Home = ({ user, snackBar }) => {
	const [currentId, setCurrentId] = useState(0)
	const query = useQuery()
	const page = query.get('page') || 1
	const searchQuery = query.get('searchQuery')
	const [tags, setTags] = useState([])

	return (
		<Root className={classes.root}>
			<Grow in>
				<Container className={classes.container}>
					<Grid className={classes.gridContainer} container spacing={3}>
						<Grid item xs={12} sm={6} md={9}>
							<Posts setCurrentId={setCurrentId} user={user} snackBar={snackBar} />
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Form currentId={currentId} setCurrentId={setCurrentId} user={user} snackBar={snackBar} />
							<Search tags={tags} setTags={setTags} />
							{!searchQuery && <Paginate page={page} />}
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Root>
	)
}

export default Home
