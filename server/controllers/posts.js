import express from 'express'
import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

const router = express.Router()

export const getPosts = async (req, res) => {
	const { page } = req.query

	try {
		const query = { $or: [{ creator: req.userId }, { _private: false }] }
		const LIMIT = 8
		const total = await PostMessage.countDocuments(query)
		const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page
		console.log('Fetching posts')
		const start = Date.now()
		const posts = await PostMessage.find(query).limit(LIMIT).sort({ createdAt: -1 }).skip(startIndex)
		const end = Date.now()
		console.log(`Fetching took ${(end - start) / 1000} seconds`)
		res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const getPost = async (req, res) => {
	const { id } = req.params
	try {
		const post = await PostMessage.findById(id)
		if (!post || (post._private && post.creator !== req.userId)) return res.status(404).send('No post with that id')

		res.status(200).json(post)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query
	try {
		const title = new RegExp(searchQuery, 'i')
		const query = {
			$and: [
				{
					$or: [{ creator: req.userId }, { _private: false }, { _private: { $exists: false } }],
				},
				{
					$or: [{ title }, { tags: { $in: tags.split(',') } }],
				},
			],
		}
		const posts = await PostMessage.find(query).sort({ createdAt: -1 })
		res.status(200).json({ data: posts })
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const createPost = async (req, res) => {
	const post = req.body

	const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
	try {
		await newPost.save()
		res.status(201).json(newPost)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const updatePost = async (req, res) => {
	const { id: _id } = req.params
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

	const post = req.body
	const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

	res.json(updatedPost)
}

export const deletePost = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send('No post with that id')
	}
	await PostMessage.findByIdAndRemove(id)
	res.json({ message: 'Post deleted Successfully' })
}

export const deleteComment = async (req, res) => {
	const { id } = req.params
	const { commentId } = req.body

	const post = await PostMessage.findById(id)
	post.comments = post.comments.filter(({ newComment: comment }) => String(comment?.commentId) !== commentId)
	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
	res.status(200).json(updatedPost)
}

export const likePost = async (req, res) => {
	const { id } = req.params

	const post = await PostMessage.findById(id)
	const index = post.likes.findIndex((id) => id === String(req.userId))

	// like the post
	if (index === -1) post.likes.push(req.userId)
	// dislike the post
	else post.likes = post.likes.filter((id) => id !== String(req.userId))

	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
	res.status(200).json(updatedPost)
}

export const commentPost = async (req, res) => {
	const { id } = req.params
	const comment = req.body

	const newComment = { ...comment, commentId: new mongoose.Types.ObjectId() }
	const post = await PostMessage.findById(id)
	post.comments.push({ newComment })
	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
	res.status(200).json(updatedPost)
}

export default router
