import { cron } from '@elysiajs/cron'

export const pingServer = cron({
	name: 'Ping Server',
	pattern: '*/14 * * * *',
	async run() {
		try {
			const response = await fetch('https://memories-omm3.onrender.com')
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
