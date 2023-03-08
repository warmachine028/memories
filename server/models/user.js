import mongoose, { Schema } from 'mongoose'

const userSchema = Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	resetToken: String,
	password: String,
	image: String,
	avatar: Object,
})

export default mongoose.model('users', userSchema)
