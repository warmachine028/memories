import { Elysia, t } from 'elysia'
import {
	getReaction,
	getTop3Reactors,
	like,
	likes,
	react,
	unlike,
	unreact,
} from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { ReactionType } from '@prisma/client'

const commentReactionRoutes = new Elysia({
	prefix: '/comments',
	detail: {
		summary: 'Comment reactions',
		tags: ['Comment Reactions'],
	},
})
	.guard({
		params: t.Object({
			commentId: t.String(),
		}),
	})
	.get('/:commentId', likes)
	.guard({
		headers: t.Object({
			authorization: t.String(),
		}),
	})
	.delete('/:commentId', unlike)
	.post('/:commentId', like)

const postReactionRoutes = new Elysia({
	prefix: '/posts',
	detail: {
		summary: 'Post reactions',
		tags: ['Post Reactions'],
	},
})
	.guard({
		params: t.Object({
			postId: t.String(),
		}),
	})
	.get('/:postId', getReaction)
	.get('/top-reactors/:postId', getTop3Reactors)
	.guard({
		headers: t.Object({
			authorization: t.String(),
		}),
	})
	.delete('/:postId', unreact)
	.guard({
		body: t.Object({
			reactionType: t.Enum(ReactionType),
		}),
	})
	.post('/:postId', react)
	.patch('/:postId', react)

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
	.use(postReactionRoutes)
	.use(commentReactionRoutes)
