import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
})

export const sendEmail = async (email, URL, res) => {
	const mailOptions = {
		from: process.env.USER,
		to: email,
		subject: 'Reset password link for memories',
		text: `Click this link to reset yout password
		${URL}`,
	}

	transport.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
			return res.status(500).json({ message: 'Email was not sent' })
		}
		res.status(200).json(info)
	})
}
