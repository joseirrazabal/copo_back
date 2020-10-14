import { gql } from 'apollo-server'
import AppRootDir from 'app-root-dir'

const schemas = gql`
    extend type Query {
        version: String
    }
`
const resolvers = {
	Query: {
		version () {
      var pjson = require(`${AppRootDir.get()}/package.json`);
      return pjson.version
		},
	},
}

export { schemas, resolvers }
