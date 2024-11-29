import { verifyToken } from '@clerk/backend'
import { type Elysia, error } from 'elysia'

// Middleware to check authentication
export const authMiddleware = (app: Elysia) =>
	app.derive(async ({ set, headers }) => {
		const sessionToken = headers['authorization']?.split(' ').at(-1)

		if (!sessionToken) {
			return { userId: null }
		}

		try {
			const { userId } = await verifyToken(sessionToken, {
				jwtKey: Bun.env.CLERK_JWT_TOKEN,
			})
			if (!userId) {
				set.status = 401
				return { userId: null }
			}
			return { userId }
		} catch (err) {
			set.status = 401
			return error(401, 'Invalid session')
		}
	})
