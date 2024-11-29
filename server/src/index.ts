import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import {
	postRoutes,
	commentRoutes,
	userRoutes,
	reactionRoutes,
	tagRoutes,
} from '@/routes'
import { docs } from '@/middlewares'
import {
	pingServer,
	deleteUnusedTagsCron,
	updateReactionCountsCron,
} from '@/cron'

const port = Bun.env.PORT || 5000

new Elysia()
	.use(pingServer)
	.use(deleteUnusedTagsCron)
	.use(updateReactionCountsCron)
	.use(cors())
	.get('/favicon.ico', () => Bun.file('public/favicon.ico'))
	.get('/', () => '💾 Hello from memories server', {
		
		detail: {
			tags: ['Root'],
			summary: 'Base route',
		
			responses: {
				'200': { description: 'Returns a message from the server' },
			},
		},
	})
	.use(postRoutes)
	.use(userRoutes)
	.use(reactionRoutes)
	.use(commentRoutes)
	.use(tagRoutes)
	.use(docs)
	.listen(port, () =>
		console.info(`🦊 Elysia is running at http://localhost:${port}`)
	)
