import { CommentRoutes, PostRoutes, UserRoutes } from './routes/index.js'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
// import { rateLimit } from 'express-rate-limit'

dotenv.config()

const app = express()

// app.use(
// 	rateLimit({
// 		windowMs: 1 * 60 * 1000, // 1 minuite
// 		max: 30,
// 	})
// )
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/posts', PostRoutes)
app.use('/user', UserRoutes)
app.use('/comments', CommentRoutes)

app.get('/', (_, res) => res.send('Hello to Memories API'))

const PORT = process.env.PORT || 5000
mongoose.set('strictQuery', true)
mongoose // https://www.mongodb.com/cloud/atlas
	.connect(process.env.CONNECTION_URL)
	.then(console.log('Connected to MongoDB Database 🌐'))
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT} 🚀`)))
	.catch((error) => console.log(`❎ Server did not connect ⚠️\n${error}`))

// CONFIGURE Connection URL: https://stackoverflow.com/questions/25090524/hide-mongodb-password-using-heroku-so-i-can-also-push-to-public-repo-on-github
// CONFIGURE AUTODEPLOY From Github:
// https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder
// https://github.com/timanovsky/subdir-heroku-buildpack
