import express from 'express'
import { CronJob } from 'cron'

const app = express()
const port = process.env.PORT || 3000

app.use('/favicon.ico', express.static('public/favicon.ico')) //
	.get('/', (_, res) => {
		res.send('Hello World!')
	})
	.listen(port, () => console.log(`Listening on port http://localhost:${port} ...`))

// Create a cron job to ping the server every 20 minutes
new CronJob(
	'*/20 * * * *',
	async () => {
		try {
			const response = await fetch(`https://memories-omm3.onrender.com`)
			if (response.ok) {
				console.log('Server pinged successfully')
			} else {
				console.error('Failed to ping server:', response.status, response.statusText)
			}
		} catch (error) {
			console.error('Error pinging server:', error)
		}
	},
	null,
	true
)
