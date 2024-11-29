import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import {
	Typography,
	Tab,
	Tabs,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Box,
	Container,
	Stack
} from '@mui/material'

// Dummy data
const dummyData = {
	posts: [
		{
			id: 1,
			title: 'First post about React',
			content: 'React is awesome!'
		},
		{
			id: 2,
			title: 'Learning TypeScript',
			content: 'TypeScript makes coding safer.'
		},
		{
			id: 3,
			title: 'Next.js for the win',
			content: 'Next.js simplifies React development.'
		}
	],
	users: [
		{ id: 1, name: 'John Doe', username: '@johndoe' },
		{ id: 2, name: 'Jane Smith', username: '@janesmith' },
		{ id: 3, name: 'Bob Johnson', username: '@bobjohnson' }
	],
	comments: [
		{ id: 1, user: 'John Doe', content: 'Great post!' },
		{ id: 2, user: 'Jane Smith', content: 'I learned a lot from this.' },
		{ id: 3, user: 'Bob Johnson', content: 'Thanks for sharing!' }
	]
}

const Search = () => {
	const [searchParams] = useSearchParams()
	const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
	const [activeTab, setActiveTab] = useState(0)
	const [filteredData, setFilteredData] = useState(dummyData)

	useEffect(() => {
		const filtered = {
			posts: dummyData.posts.filter(
				(post) =>
					post.title
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					post.content
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			),
			users: dummyData.users.filter(
				(user) =>
					user.name
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					user.username
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			),
			comments: dummyData.comments.filter(
				(comment) =>
					comment.user
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					comment.content
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			)
		}
		setFilteredData(filtered)
	}, [searchTerm])

	useEffect(() => {
		const query = searchParams.get('q')
		if (query) {
			setSearchTerm(query)
		}
	}, [searchParams])

	const handleTabChange = (_, newValue) => setActiveTab(newValue)

	const renderContent = () => {
		switch (activeTab) {
			case 0:
				return (
					<List>
						{filteredData.posts.map((post) => (
							<ListItem key={post.id}>
								<ListItemText
									primary={post.title}
									secondary={post.content}
								/>
							</ListItem>
						))}
					</List>
				)
			case 1:
				return (
					<List>
						{filteredData.users.map((user) => (
							<ListItem key={user.id}>
								<ListItemAvatar>
									<Avatar>{user.name[0]}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={user.name}
									secondary={user.username}
								/>
							</ListItem>
						))}
					</List>
				)
			case 2:
				return (
					<List>
						{filteredData.comments.map((comment) => (
							<ListItem key={comment.id}>
								<ListItemText
									primary={comment.user}
									secondary={comment.content}
								/>
							</ListItem>
						))}
					</List>
				)
			default:
				return null
		}
	}

	return (
		<Container sx={{ py: { xs: 2, md: 4 }, height: '100vh' }} maxWidth="xl">
			<Stack flexGrow={1}>
				<Box>
					<Typography variant="h4" gutterBottom>
						Search Results for &quot;{searchTerm}&quot;
					</Typography>
					<Tabs
						value={activeTab}
						onChange={handleTabChange}
						aria-label="search results tabs"
					>
						<Tab
							label="Posts"
							id="search-tab-0"
							aria-controls="search-tabpanel-0"
						/>
						<Tab
							label="Users"
							id="search-tab-1"
							aria-controls="search-tabpanel-1"
						/>
						<Tab
							label="Comments"
							id="search-tab-2"
							aria-controls="search-tabpanel-2"
						/>
					</Tabs>
					<Card sx={{ mt: 2 }}>
						<CardContent>{renderContent()}</CardContent>
					</Card>
				</Box>
			</Stack>
		</Container>
	)
}

export default Search
