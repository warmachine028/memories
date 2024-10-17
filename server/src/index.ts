import { Elysia } from 'elysia'
import { rateLimit } from 'elysia-rate-limit'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { cron } from '@elysiajs/cron'
import { postRoutes } from './routes'

const port = Bun.env.PORT || 5000
const RATE_LIMIT = 1000
const RATE_LIMIT_WINDOW = 1000 * 60 // 1 minute in milliseconds

new Elysia()
	// .use(
	// 	rateLimit({
	// 		max: RATE_LIMIT,
	// 		duration: RATE_LIMIT_WINDOW,
	// 	})
	// )
	.use(
		cron({
			name: 'Ping Server',
			pattern: '*/10 * * * *',
			// Create a cron job to ping the server every 20 minutes
			async run() {
				try {
					const response = await fetch('https://memories-omm3.onrender.com')
					if (response.ok) {
						console.log('Server pinged successfully')
					} else {
						console.error('Failed to ping server:', response.status, response.statusText)
					}
				} catch (error) {
					console.error('Error pinging server:', error)
				}
			},
		})
	)
	.use(swagger())
	.use(cors())
	.get('/', '💾 Hello from memories server')
	.get('/favicon.ico', () => Bun.file('public/favicon.ico'))
	.group('/posts', (app) => app.use(postRoutes))
	.listen(port, () => console.log(`🦊 Elysia is running at http://localhost:${port}`))
