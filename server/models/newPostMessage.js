import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creator: String,
	tags: [String],
	_private: {
		type: Boolean,
		default: false,
	},
	selectedFile: String,
	likes: {
		type: [String],
		default: [],
	},
	comments: {
		type: [Object],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

export default mongoose.model('postmessagesnew', postSchema, 'postMessagesNew')

// comments: {
//         comment: {
//             creator: { type: String, default: "" },
//             comment: { type: String, default: "" },
//             createdAt: {type: Date, default: new Date()}
//         },
//     },

// comments: {
// 		type: [String],
// 		default: [],
// 	},
