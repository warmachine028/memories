import { createClerkClient } from '@clerk/express'
import type { Elysia } from 'elysia'

// Initialize Clerk
const clerkClient = createClerkClient({ secretKey: Bun.env.CLERK_SECRET_KEY })

// Middleware to check authentication
export const authMiddleware = (app: Elysia) =>
	app.derive(async ({ set, headers }) => {
		const sessionToken = headers['authorization']?.split(' ')[1]

		if (!sessionToken) {
			return { userId: null }
		}

		try {
			const session = await clerkClient.sessions.verifySession(sessionToken, sessionToken)
			return { userId: session.userId }
		} catch (error) {
			set.status = 401
			throw new Error('Invalid session')
		}
	})