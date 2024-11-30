import { useQuery } from '@tanstack/react-query'
import { searchTags } from '@/api'

export const useSearchTags = (input) =>
	useQuery({
		queryKey: ['tags', input],
		queryFn: () => searchTags(input),
		enabled: !!input,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30
	})
