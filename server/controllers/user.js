import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import PostMessage from '../models/postMessage.js'

const secret = 'test'

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
const getTop5Tags = ({ allTags: tags }) => {
	let frequency = {}
	tags.map((tag) => (frequency[tag] = countOccurrences(tags, tag)))
	tags.sort((self, other) => {
		let diff = frequency[other] - frequency[self]
		if (diff == 0) diff = frequency[other] - frequency[self]
		return diff
	})
	return [...new Set(tags)].splice(0, 5)
}

export const signin = async (req, res) => {
	const { email, password } = req.body

	try {
		const existingUser = await User.findOne({ email })

		if (!existingUser) return res.status(404).json({ message: "User doesn't exist in dataBase" })
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

		if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid credentials' })

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: '1h' })

		res.status(200).json({ result: existingUser, token })
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong. ' })
	}
}

export const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName, avatar } = req.body

	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) return res.status(409).json({ message: 'User already exists.' })

		if (!email.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')) {
			return res.status(501).json({ message: 'Invalid Email ID.' })
		} else if (password !== confirmPassword) {
			return res.status(409).json({ message: "Validation Passwords don't match." })
		} else if (password.length < 6) {
			return res.status(409).json({ message: 'Password must be greater than 6 characters.' })
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, avatar: avatar })
		const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' })

		res.status(201).json({ result, token })
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong.' })
	}
}

export const getUserDetails = async (req, res) => {
	const { id } = req.params

	try {
		const allTags = await PostMessage.aggregate([
			{ $match: { creator: id } },
			{
				$group: {
					_id: null,
					tags: { $push: '$tags' },
				},
			},
			{
				$project: {
					_id: 0,
					allTags: {
						$reduce: {
							input: '$tags',
							initialValue: [],
							in: {
								$concatArrays: ['$$this', '$$value'],
							},
						},
					},
				},
			},
		])

		const result = {
			postsCreated: await PostMessage.countDocuments({ creator: id }),
			postsLiked: await PostMessage.countDocuments({ likes: { $all: [id] } }),
			privatePosts: await PostMessage.countDocuments({
				$and: [{ creator: id }, { _private: true }],
			}),
			totalLikesRecieved:
				(
					await PostMessage.aggregate([
						{ $match: { creator: id } },
						{
							$group: {
								_id: '_id',
								totalValue: {
									$sum: {
										$size: '$likes',
									},
								},
							},
						},
					])
				)[0]?.totalValue || 0,
			longestPostWords:
				(
					await PostMessage.aggregate([
						{ $match: { creator: id } },
						{
							$project: {
								message: 1,
								messageLength: { $strLenCP: '$message' },
							},
						},
						{ $sort: { messageLength: -1 } },
					])
				)[0]?.message.split(' ').length || 0,
			top5Tags: allTags.length ? getTop5Tags(allTags[0]) : allTags,
		}
		res.status(200).json(result)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const getUserPostsByType = async (req, res) => {
	const { id } = req.params
	const { page, type } = req.query

	try {
		const query = {
			created: { creator: id },
			liked: { likes: { $all: [id] } },
			private: { $and: [{ creator: id }, { _private: true }] },
		}

		const LIMIT = 10
		const total = await PostMessage.countDocuments(query[type])
		const startIndex = (Number(page) - 1) * LIMIT
		const posts = await PostMessage.find(query[type]).limit(LIMIT).sort({ createdAt: -1 }).skip(startIndex)
		
		res.status(200).json({ data: posts, numberOfPages: Math.ceil(total / LIMIT) })
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}
