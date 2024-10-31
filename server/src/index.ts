import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { cron } from '@elysiajs/cron'
import {
	postRoutes,
	commentRoutes,
	userRoutes,
	reactionRoutes,
	tagRoutes,
} from '@/routes'
import { deleteUnusedTags } from '@/controllers'
import { docs } from '@/middlewares'

const port = Bun.env.PORT || 5000

new Elysia()
	.use(
		// Create a cron job to ping the server every 14 minutes
		cron({
			name: 'Ping Server',
			pattern: '*/14 * * * *',
			async run() {
				try {
					const response = await fetch(
						'https://memories-omm3.onrender.com'
					)
					if (response.ok) {
						console.log('Server pinged successfully')
					} else {
						console.error(
							'Failed to ping server:',
							response.status,
							response.statusText
						)
					}
				} catch (error) {
					console.error('Error pinging server:', error)
				}
			},
		})
	)
	.use(
		cron({
			name: 'Deleting unused tags',
			// runs every night at 02:00 AM
			pattern: '0 2 * * *',
			async run() {
				try {
					const result = await deleteUnusedTags()
					console.log(`${result.count} unused tags deleted.`)
					console.log('Below are the tags deleted:')
					result.tags.forEach((tag, i) => {
						console.log(` ${i + 1}. ${tag}`)
					})
				} catch (error) {
					console.error('Error deleting unused tags:', error)
				}
			},
		})
	)
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
