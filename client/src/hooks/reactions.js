import { getPostReactions } from '@/api'
import { useQuery } from '@tanstack/react-query'

export const useGetPostReactions = (postId) => {
	return useQuery({
		queryKey: ['postReactions', postId],
		queryFn: () => getPostReactions(postId)
	})
}
