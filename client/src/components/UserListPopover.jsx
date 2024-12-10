import { useEffect, useRef } from 'react'
import {
	CircularProgress,
	Popper,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar
} from '@mui/material'
import { useGetLikedUsers } from '@/hooks'
import { UserAvatar } from '.'

const PopoverUserList = ({ id, anchorEl, open, onClose, total }) => {
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
	return (
		<Popper
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
			placement="bottom-start"
			modifiers={[
				{
					name: 'offset',
					options: { offset: [0, 8] }
				}
			]}
		>
			<Paper elevation={0}>
				<List
					ref={listRef}
					sx={{
						width: 250,
						maxHeight: 300,
						overflow: 'auto'
					}}
				>
					{data?.pages.flatMap((page) =>
						page.users.slice(0, total).map((user) => (
							<ListItem key={user.id}>
								<ListItemAvatar>
									<UserAvatar user={user} size={40} />
								</ListItemAvatar>
								<ListItemText primary={user.fullName} />
							</ListItem>
						))
					)}
					{isFetching && (
						<ListItem>
							<CircularProgress size={20} />
						</ListItem>
					)}
				</List>
			</Paper>
		</Popper>
	)
}

export default PopoverUserList
