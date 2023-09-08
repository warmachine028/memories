import express from 'express'
import mongoose from 'mongoose'
import Comment from '../models/comment.js'
import { setCreator } from './posts.js'
import { getUser } from './user.js'

const router = express.Router()

export const createComment = async (req, res) => {
	const comment = req.body
	try {
		const { creator: userId, post: postId, message } = comment
		const newComment = new Comment({
			post: new mongoose.Types.ObjectId(postId),
			creator: new mongoose.Types.ObjectId(userId),
			message,
		})
		await newComment.save()
		const creator = await getUser(userId)
		const result = { ...newComment._doc, creator }
		res.status(201).json(result)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const getComments = async (req, res) => {
	try {
		const { id } = req.params
		const postId = new mongoose.Types.ObjectId(id)
		let comments = await Comment.aggregate([
			{ $match: { post: postId } }, //
			{ $sort: { createdAt: -1 } },
			{
				$lookup: {
					from: 'users',
					localField: 'creator',
					foreignField: '_id',
					as: 'creator',
				},
			},
		])
		comments = setCreator(comments)
		res.status(200).json(comments)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export default router

export const deleteComment = async (req, res) => {
	try {
		const { id } = req.params
		await Comment.findByIdAndDelete(id)
		res.json({ message: 'Comment deleted Successfully' })
	} catch (error) {
		res.json({ message: error.message })
	}
}
