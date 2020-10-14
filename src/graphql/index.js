/* eslint: global-require: 0 */
/* eslint: no-console: 0 */
import { buildFederatedSchema } from '@apollo/federation'
import { ApolloServer } from 'apollo-server-express'
import path from 'path'
import requireAll from '../utils/requireAll'

import DataSources from './dataSources'

const getContext = async ({ headers, user, mongoClient }) => {
	return {
		// headers,
		db: mongoClient && mongoClient.db(),
		user
	}
}

const apollo = async ({ app, mongoClient }) => {
	const federated = []

	const files = requireAll(path.join(`${__dirname}/controllers`), true, /\index.js$/)
	files.keys().forEach(file => {
		// solo la primer carpeta
		const pathCount = file.split('/')
		if (pathCount.length === 2) {
			const mod = require(`${__dirname}/controllers/${file}`)

			if (mod.schemas && mod.resolvers) {
				federated.push({
					typeDefs: mod.schemas,
					resolvers: mod.resolvers
				})
			}
		}
	})

	const server = new ApolloServer({
		schema: buildFederatedSchema(federated),
		tracing: true,
		introspection: true,
		cacheControl: true,
		dataSources: () => DataSources({ mongoClient }),
		context: async ({ req }) => getContext({ ...req, mongoClient }),
	})

  return server.applyMiddleware({ app, path: '/' })
}

export default apollo
