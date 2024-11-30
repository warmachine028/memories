import { Elysia, t } from 'elysia'
import { getTrendingTags, searchTags } from '@/controllers'

export const tagRoutes = new Elysia({
	prefix: '/tags',
	detail: {
		summary: 'Trending Tags',
		tags: ['Tags'],
	},
})
	.get('/trending', getTrendingTags)
	.get('/search', searchTags, {
		query: t.Object({
			q: t.String(),
		}),
	})
