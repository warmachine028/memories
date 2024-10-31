import { Elysia, t } from 'elysia'
import type { RequestParams } from '@/types'
import { authMiddleware } from '@/middlewares'

export const commentRoutes = new Elysia({
	prefix: '/comments',
	detail: {
		tags: ['Comments'],
		responses: {
			'200': {
				description: 'Returns a list of comments',
			},
			'401': {
				description: 'Unauthorized',
			},
		},
	},
})
	.use(authMiddleware)
	.guard({
		headers: t.Object({
			authorization: t.Optional(t.String()),
		}),
	})
	.get(
		'/:postId',
		({ query: { postId } }: RequestParams) => {
			return [
				{
					id: '1',
					postId: '1',
					authorId: '1',
					content: 'Hello',
					likeCount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '2',
					postId: '1',
					authorId: '2',
					content: 'Hello',
					likeCount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			].filter((comment) => comment.postId === postId)
		},
		{
			params: t.Object({
				postId: t.String(),
			}),
		}
	)
	.guard({
		headers: t.Object({
			authorization: t.String(),
		}),
	})
	.post(
		'/:postId',
		({ params: { postId }, body, userId }: RequestParams) => {
			return {
				id: '1',
				postId,
				authorId: userId,
				content: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		},
		{
			params: t.Object({
				postId: t.String(),
			}),
		}
	)
	.delete('/:id', ({ params: { id } }: RequestParams) => {
		return {
			id,
			postId: '1',
			authorId: '1',
			content: 'Hello',
			createdAt: new Date(),
			updatedAt: new Date(),
		}
	})
	.patch('/:id', ({ params: { id }, body, userId }: RequestParams) => {
		return {
			id,
			postId: '1',
			authorId: userId,
			content: 'Hello',
		}
	})
