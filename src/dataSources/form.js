import { DataSource } from 'apollo-datasource'
import { ApolloError } from 'apollo-server'
import get from 'lodash/get'

import config from '../config'

class Form extends DataSource {
	constructor({ store }) {
		super()
		this.store = store
	}

	async save(args, refresh = false) {
		try {
      const result = await this.store.collection('formulario').insertOne( args )
      console.log("result", get(result, 'result'))

      return  { description: "bien"}
		} catch (e) {
			console.log('fares', e)
		}
	}


}

export default Form 
