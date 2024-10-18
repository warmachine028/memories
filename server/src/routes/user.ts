import { Elysia, t } from 'elysia'
import { handleWebhook, getUsers, getUser } from '@/controllers'

const webhookRoutes = new Elysia({ prefix: '/webhook' })
	.get('/', handleWebhook, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})
	.post('/', handleWebhook, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})
	.put('/', handleWebhook, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})

export const userRoutes = new Elysia({ prefix: '/users' }) //
	.use(webhookRoutes)
	.get('/', getUsers)
	.get('/:id', getUser)
