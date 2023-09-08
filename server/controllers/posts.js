import express from 'express'
import mongoose from 'mongoose'
import Post from '../models/post.js'
import Media from '../models/media.js'
import Comment from '../models/comment.js'

const router = express.Router()

export const setCreator = (posts) =>
	posts.map((post) => {
		delete post.creator[0].password
		delete post.creator[0].resetToken
		return { ...post, creator: post.creator[0] }
	})

export const getPosts = async (req, res) => {
	const { page } = req.query

	try {
		const userId = new mongoose.Types.ObjectId(req.userId)
		const query = { $or: [{ private: false }, { creator: userId }] }
		const LIMIT = 8
		const total = await Post.countDocuments(query)
		const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page
		console.log('Fetching posts')
		const start = Date.now()
		let posts = await Post.aggregate([
			{ $match: query },
			{ $sort: { createdAt: -1 } },
			{ $skip: startIndex },
			{ $limit: LIMIT },
			{
				$lookup: {
					from: 'users',
					localField: 'creator',
					foreignField: '_id',
					as: 'creator',
				},
			},
		])
		posts = setCreator(posts)
		const end = Date.now()
		console.log(`Fetching took ${(end - start) / 1000} seconds`)
		res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: error.message })
	}
}

export const getPost = async (req, res) => {
	const { id } = req.params
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).send('Invalid Id. Post Not Found')
		}
		let posts = await Post.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(id) } },
			{
				$lookup: {
					from: 'users',
					localField: 'creator',
					foreignField: '_id',
					as: 'creator',
				},
			},
			{
				$lookup: {
					from: 'media',
					localField: '_id',
					foreignField: '_id',
					as: 'media',
				},
			},
			{
				$addFields: {
					image: { $arrayElemAt: ['$media.image', 0] },
				},
			},
			{
				$project: {
					thumbnail: 0,
					media: 0,
				},
			},
		])

		posts = setCreator(posts)
		if (!posts.length) {
			return res.status(404).send('Post not found with that id')
		}
		const post = posts[0]
		if (post.private && `${post.creator._id}` !== req.userId) {
			return res.status(404).send("Can't access post with that Id")
		}
		res.status(200).json(post)
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: error.message })
	}
}

export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query
	try {
		const title = new RegExp(searchQuery, 'i')
		const userId = new mongoose.Types.ObjectId(req.userId)
		const query = {
			$and: [
				{
					$or: [{ creator: userId }, { private: false }],
				},
				{
					$or: [{ title }, { tags: { $in: tags.split(',') } }],
				},
			],
		}
		let posts = await Post.aggregate([
			{ $match: query },
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
		posts = setCreator(posts)
		res.status(200).json({ data: posts })
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const createPost = async (req, res) => {
	const post = req.body
	const media = post.image
	try {
		const newPost = new Post({
			...post,
			creator: new mongoose.Types.ObjectId(post.creator),
		})
		await newPost.save()

		const newMedia = new Media({
			_id: newPost._id,
			image: media,
		})
		await newMedia.save()
		res.status(201).json(newPost)
	} catch (error) {
		res.status(409).send(error.message)
	}
}

export const updatePost = async (req, res) => {
	const { id: _id } = req.params
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

	const post = req.body
	const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
	await Media.findByIdAndUpdate(_id, { image: post.image })
	res.status(200).json(updatedPost)
}

export const deletePost = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send('No post with that id')
	}
	await Post.findByIdAndRemove(id)
	await Media.findByIdAndRemove(id)
	await Comment.deleteMany({ post: new mongoose.Types.ObjectId(id) })
	res.json({ message: 'Post deleted Successfully' })
}

export default router
