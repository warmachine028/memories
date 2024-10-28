import { Elysia, t } from 'elysia'
import type { RequestParams } from '@/types'

export const tagRoutes = new Elysia({ prefix: '/tags' }) //
	.get('/', () => {
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
			{
				id: '3',
				name: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]
	})
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