import { Elysia, t } from 'elysia'
import { react } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { ReactionType } from '@prisma/client'
import { RequestParams } from '@/types'

export const reactionRoutes = new Elysia({ prefix: '/reactions' })
	.use(authMiddleware)
	.get(
		'/:postId',
		({ params: { postId } }: RequestParams) => {
			return {}
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
	.post('/:postId', react, {
		body: t.Object({
			reactionType: t.Enum(ReactionType),
		}),
		params: t.Object({
			postId: t.String(),
		}),
	})
	.delete('/:postId', ({ params: { postId } }: RequestParams) => {
		return {}
	})
	.patch('/:postId', ({ params: { postId } }: RequestParams) => {
		return {}
	})
