import mongoose, { Schema } from 'mongoose'

const commentSchema = Schema({
	post: String,
	by: String,
	message: String,
	likes: [String],
	createdAt: { type: Date, default: new Date() },
})

export default mongoose.model('comments', commentSchema)
