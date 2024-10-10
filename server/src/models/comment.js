import mongoose, { Schema } from 'mongoose'

const commentSchema = Schema({
	post: mongoose.Types.ObjectId,
	creator: mongoose.Types.ObjectId,
	message: String,
	likes: [String],
	createdAt: { type: Date, default: new Date() },
})

export default mongoose.model('comments', commentSchema)
