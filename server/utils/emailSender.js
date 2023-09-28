import { createTransport } from 'nodemailer'

const transport = createTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
})

export const sendEmail = (email, URL, res) => {
	const mailOptions = {
		from: `Memories Server 👻 <${process.env.USER}>`,
		to: email,
		subject: 'Reset password link for memories',
		text: `Click this link to reset your password
		${URL}`,
	}

	transport.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).json({ message: 'Email was not sent', error: error.message })
		}
		res.status(200).json(info)
	})
}
