import { Elysia, t } from 'elysia'
import {
	getTop3Reactors,
	like,
	likes,
	react,
	reactions,
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
	.get('/:postId', reactions)
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
	},
})
	.use(authMiddleware)
	.use(postReactionRoutes)
	.use(commentReactionRoutes)
