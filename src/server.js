import 'regenerator-runtime/runtime'
import { createServer } from 'http'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import { MongoClient } from 'mongodb'

import config from './config'
import graphql from './graphql'
import jwt from './utils/jwt'

const app = express()
const server = createServer(app)

const start = async () => {
	const mongoClient = await MongoClient.connect(config.mongo.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	// app.client = mongoClient
	// app.db = mongoClient.db()

	app.disable('x-powered-by')

	app.use(compression())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(cors())
	app.use(async (req, res, next) => {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			const token = req.headers.authorization.split(' ')[1]
			if (token) {
				req.user = await jwt.verify(token)
			}
		}
		next()
	})

	await graphql({ app, mongoClient })

	server.listen({ url: config.host, port: config.port }, () => {
		console.log(`🚀  Server ready at ${config.port}`)
	})
}

start().catch(err => {
	console.log(err)
})
