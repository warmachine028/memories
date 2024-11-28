import { cron } from '@elysiajs/cron'

export const pingServer = cron({
	name: 'Ping Server',
	pattern: '*/14 * * * *',
	async run() {
		try {
			const response = await fetch(Bun.env.SERVER_URL!)
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
