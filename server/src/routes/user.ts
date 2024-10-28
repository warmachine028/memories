import { Elysia, t } from 'elysia'
import { handleWebhook, getUsers, getUser } from '@/controllers'

const webhookRoutes = new Elysia({ prefix: '/webhook' })
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

export const userRoutes = new Elysia({ prefix: '/users' })
	.use(webhookRoutes) //
	.get('/', getUsers)
	.get('/:id', getUser)
