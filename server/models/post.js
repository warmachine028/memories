import mongoose, { Schema } from 'mongoose'

const postSchema = Schema({
	creator: mongoose.Types.ObjectId,
	title: String,
	message: String,
	thumbnail: String,
	tags: [String],
	likes: [String],
	createdAt: { type: Date, default: new Date() },
	private: Boolean,
})

export default mongoose.model('posts', postSchema)
