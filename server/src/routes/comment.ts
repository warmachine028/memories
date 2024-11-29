import { Elysia, t } from 'elysia'
import { authMiddleware } from '@/middlewares'
import {
	createComment,
	deleteComment,
	getComments,
	updateComment,
} from '@/controllers'
import { query as querySchema, params as paramsSchema } from '@/schemas'

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
		params: t.Object({ postId: t.String() }),
		body: t.Object({
			content: t.String(),
		}),
	})
	.put('/:id', updateComment, {
		params: paramsSchema,
		body: t.Object({
			content: t.String(),
		}),
	})
	.delete('/:id', deleteComment, {
		params: paramsSchema,
	})
