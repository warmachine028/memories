import jwt from 'jsonwebtoken'

const secret = process.env.TOKEN_SECRET

const auth = (req, _, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		const isCustomAuth = token?.length < 500

		let decodedData = ''

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, secret)
			req.userId = decodedData?.id
		} else {
			decodedData = jwt.decode(token)
			req.userId = decodedData?.sub.padStart(24, '0')
		}

		next()
	} catch (error) {
		console.log(error)
	}
}

export default auth
