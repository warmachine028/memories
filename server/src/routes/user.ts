import { Elysia, t } from 'elysia'
import { createUser } from '@/controllers'
import { prisma } from '@/lib'

const webhookRoutes = new Elysia({ prefix: '/webhook' })
	.get('/', createUser, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})
	.post('/', createUser, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})
	.put('/', createUser, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})

export const userRoutes = new Elysia({ prefix: '/users' })
	.use(webhookRoutes)
	.get('/', () => prisma.user.findMany())
	.get('/:id', ({ params }) => {
		return prisma.user.findUnique({
			where: {
				id: params.id,
			},
		})
	})
