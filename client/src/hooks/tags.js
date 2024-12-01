import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getTrendingTags, searchPostsByTags, searchTags } from '@/api'

export const useSearchTags = (input) =>
	useQuery({
		queryKey: ['tags', input],
		queryFn: () => searchTags(input),
		enabled: !!input,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30
	})

export const useTrendingTags = () =>
	useQuery({
		queryKey: ['tags'],
		queryFn: getTrendingTags,
		staleTime: Infinity
	})

export const useSearchPostsByTag = (tag) =>
	useInfiniteQuery({
		queryKey: ['search-tags', tag],
		queryFn: ({ pageParam }) => searchPostsByTags(tag, pageParam, 6),
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})
