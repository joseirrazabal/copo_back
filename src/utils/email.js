import path from 'path'
import ejs from 'ejs'
import kue from 'kue'
import AppRootDir from 'app-root-dir'


class Email {
	constructor() {
		this.queue = kue.createQueue({
			redis: process.env.REDIS_URL
		})
	}

	send = async (email, subject, template, data) => {
		const views = path.join(__dirname, '..', 'views')

		const templateDir = path.join(views, 'emails', `${template}.ejs`)

		const html = await ejs.renderFile(templateDir, data)

		// a redis
		this.queue
			.create('send-email', {
				title: `${email}-${subject}`, // par ver en que
				from: 'Upate ✔ <no-reply@upate.com>',
				to: email,
				subject,
				text: '',
				html
			})
			.save(err => {
				if (err) throw err
			})
	}
}

export default new Email()

