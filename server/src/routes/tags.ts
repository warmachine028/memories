import { Elysia, t } from 'elysia'
import type { RequestParams } from '@/types'
import { getTrendingTags } from '@/controllers'

export const tagRoutes = new Elysia({
	prefix: '/tags',
	detail: {
		summary: 'Trending Tags',
		tags: ['Tags'],
	},
})
	.get('/trending', getTrendingTags)
	.get(
		'/:postId',
		({ query: { name } }: RequestParams) => {
			return [
				{
					id: '1',
					name: 'Hello',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '2',
					name: 'Hello',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			].filter((tag) => tag.name === name)
		},
		{
			params: t.Object({
				postId: t.String(),
			}),
		}
	)
