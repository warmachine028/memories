import { getUser, getUserStats } from '@/api'
import { useQuery } from '@tanstack/react-query'

export const useGetUser = (id) => {
	return useQuery({
		queryKey: ['user', id],
		queryFn: () => getUser(id)
	})
}

export const useGetUserStats = (id) => {
	return useQuery({
		queryKey: ['userStats', id],
		queryFn: () => getUserStats(id)
	})
}

