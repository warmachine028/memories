import mongoose, { Schema } from 'mongoose'

const postSchema = Schema({
	creator: String,
	title: String,
	message: String,
	image: String,
	tags: [String],
	likes: [String],
	createdAt: { type: Date, default: new Date() },
	_private: { type: Boolean, default: false },
})

export default mongoose.model('posts', postSchema)
