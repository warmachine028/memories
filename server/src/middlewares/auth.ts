import { verifyToken } from '@clerk/express'
import type { Elysia } from 'elysia'

// Middleware to check authentication
export const authMiddleware = (app: Elysia) =>
	app.derive(async ({ set, headers }) => {
		const sessionToken = headers['authorization']?.split(' ')[1]

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
		} catch (error) {
			set.status = 401
			return { userId: null, error: 'Invalid session' }
		}
	})
