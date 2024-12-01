import { Elysia, t } from 'elysia'
import { getTrendingTags, searchTags, getPostsByTag } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { query as querySchema } from '@/schemas'

export const tagRoutes = new Elysia({
	prefix: '/tags',
	detail: {
		summary: 'Trending Tags',
		tags: ['Tags'],
	},
})
	.use(authMiddleware)
	.get('/trending', getTrendingTags)
	.get('/search', searchTags, {
		query: t.Object({
			q: t.String(),
		}),
	})
	.guard({
		headers: t.Object({
			authorization: t.Optional(t.String()),
		}),
	})
	.get('/posts/:tag', getPostsByTag, {
		query: querySchema,
	})
