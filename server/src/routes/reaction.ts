import { Elysia, t } from 'elysia'
import { getReaction, react, unreact } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { ReactionType } from '@prisma/client'

export const reactionRoutes = new Elysia()
	.use(authMiddleware)
	.guard({
		params: t.Object({
		postId: t.String(),
		}),
	})
	.get('/posts/:postId/reacts', getReaction)
	.guard({
		headers: t.Object({
			authorization: t.String(),
		}),
	})
	.delete('/posts/:postId/react', unreact)
	.guard({
		body: t.Object({
			reactionType: t.Enum(ReactionType),
		}),
	})
	.post('/posts/:postId/react', react)
	.patch('/posts/:postId/react', react)
