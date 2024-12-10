import {
	Drawer,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	IconButton,
	CircularProgress,
	Stack,
	Divider
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useEffect, useRef } from 'react'
import { useGetLikedUsers } from '@/hooks'
import { UserAvatar } from '.'
import { reactions } from '@/data'

const UserListDrawer = ({ id, open, onClose, total }) => {
	const { data, isFetching, fetchNextPage, hasNextPage } =
		useGetLikedUsers(id)
	const listRef = useRef(null)

	useEffect(() => {
		const handleScroll = () => {
			if (listRef.current) {
				const { scrollTop, clientHeight, scrollHeight } =
					listRef.current
				if (
					scrollHeight - scrollTop <= clientHeight + 1 &&
					hasNextPage &&
					!isFetching
				) {
					fetchNextPage()
				}
			}
		}

		const currentListRef = listRef.current
		if (currentListRef) {
			currentListRef.addEventListener('scroll', handleScroll)
		}

		return () => {
			if (currentListRef) {
				currentListRef.removeEventListener('scroll', handleScroll)
			}
		}
	}, [fetchNextPage, hasNextPage, isFetching])
	console.log(reactions[data?.pages[0].users[0].reaction])
	return (
		<Drawer
			anchor="bottom"
			open={open}
			onClose={onClose}
			PaperProps={{
				elevation: 0,
				sx: {
					height: '50%',
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10
				}
			}}
		>
			<Stack
				p={3}
				justifyContent="space-between"
				alignItems="center"
				flexDirection="row"
			>
				<Typography variant="h6">Reactions</Typography>
				<IconButton onClick={onClose} edge="end" aria-label="close">
					<Close />
				</IconButton>
			</Stack>
			<List ref={listRef} sx={{ maxHeight: 300, overflow: 'auto', p: 3 }}>
				{data?.pages.flatMap((page) =>
					page.users.slice(0, total).map((user, index) => {
						const userReaction = reactions.find(
							(reaction) => reaction.label === user.reaction
						)
						return (
							<>
								<ListItem key={user.id} dense>
									<ListItemAvatar>
										<UserAvatar user={user} size={40} />
									</ListItemAvatar>
									<ListItemText
										primary={user.fullName}
										secondary={
											userReaction && (
												<IconButton
													size="small"
													sx={{
														color: userReaction.color
													}}
												>
													<userReaction.icon />
												</IconButton>
											)
										}
									/>
								</ListItem>
								{index < total - 1 && <Divider />}
							</>
						)
					})
				)}
				{isFetching && (
					<ListItem>
						<CircularProgress size={20} />
					</ListItem>
				)}
			</List>
		</Drawer>
	)
}

export default UserListDrawer
