import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { rateLimit } from 'express-rate-limit'
import { CommentRoutes, PostRoutes, UserRoutes } from './routes/index.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(
	cors({
		origin: process.env.BASE_URL,
		credentials: true,
	}),
	rateLimit({
		windowMs: 1 * 60 * 1000, // 1 minuite
		max: 30,
		standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
		legacyHeaders: false, // `X-RateLimit-*` headers,
		message: 'Too many requests, please try again later.',
		statusCode: 429,
	}),
	express.json()
)
	.use('/posts', PostRoutes)
	.use('/user', UserRoutes)
	.use('/comments', CommentRoutes)

mongoose // https://www.mongodb.com/cloud/atlas
	.connect(process.env.MONGO_URI)
	.then(console.log('Connected to MongoDB Database 🚀🚀'))
	.then(() => app.listen(PORT, () => console.log(`Server running at ${process.env.BASE_URL} 🌐`)))
	.catch((error) => console.log(`❎ Server did not connect ⚠️\n${error}`))

export default app
