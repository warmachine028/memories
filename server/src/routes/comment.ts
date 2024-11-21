import { Elysia, t } from 'elysia'
import type { RequestParams } from '@/types'
import { authMiddleware } from '@/middlewares'
import { createComment, deleteComment, getComments } from '@/controllers'
import { query as querySchema } from '@/schemas'

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
	.get('/:postId', getComments, {
		params: t.Object({
			postId: t.String(),
		}),
		query: querySchema,
	})
	.guard({
		headers: t.Object({
			authorization: t.String(),
		}),
	})
	.post('/:postId', createComment, {
		params: t.Object({
			postId: t.String(),
		}),
		body: t.Object({
			content: t.String(),
		}),
	})
	.delete('/:id', deleteComment)
	.patch('/:id', ({ params: { id }, body, userId }: RequestParams) => {
		return {
			id,
			postId: '1',
			authorId: userId,
			content: body.content,
		}
	})
