import { Elysia, t } from 'elysia'
import { getReaction, react, unreact } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { ReactionType } from '@prisma/client'

export const reactionRoutes = new Elysia({
	prefix: '/reactions',
	detail: {
		tags: ['Reactions'],
		responses: {
			'200': {
				description: 'Returns a list of reactions',
			},
			'401': {
				description: 'Unauthorized',
			},
		},
		security: [{ bearerAuth: [] }],
		
	},
})
	.use(authMiddleware)
	.guard({
		params: t.Object({
			postId: t.String(),
		}),
	})
	.get('/posts/:postId', getReaction)
	.guard({
		headers: t.Object({
			authorization: t.String(),
		}),
	})
	.delete('/posts/:postId', unreact)
	.guard({
		body: t.Object({
			reactionType: t.Enum(ReactionType),
		}),
	})
	.post('/posts/:postId', react)
	.patch('/posts/:postId', react)
