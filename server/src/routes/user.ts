import { Elysia, t } from 'elysia'
import { handleWebhook } from '@/controllers'
import { prisma } from '@/lib'

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

export const userRoutes = new Elysia({ prefix: '/users' })
	.use(webhookRoutes)
	.get('/', () => prisma.user.findMany())
	.get('/:id', ({ params }) => prisma.user.findUnique({ where: { id: params.id } }))
