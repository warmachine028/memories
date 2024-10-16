import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use('/favicon.ico', express.static('public/favicon.ico')) //
	.get('/', (_, res) => {
		res.send('Hello World!')
	})
	.listen(port, () => console.log(`Listening on port http://localhost:${port} ...`))
