import { Elysia, t } from 'elysia'
import { handleWebhook, getUser, getUserStats } from '@/controllers'

const webhookRoutes = new Elysia({
	prefix: '/webhook',
	detail: { summary: 'Webhook routes' },
})
	.guard({
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})
	.get('/', handleWebhook)
	.post('/', handleWebhook)
	.put('/', handleWebhook)

export const userRoutes = new Elysia({
	prefix: '/users',

	detail: {
		tags: ['Users'],
		responses: {
			'200': {
				description: 'Returns a list of users',
			},
			'401': {
				description: 'Unauthorized',
			},
		},
	},
})
	.use(webhookRoutes)
	.get('/:id', getUser)
	.get('/:id/stats', getUserStats)
