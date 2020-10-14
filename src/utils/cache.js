import { promisify } from 'util'
import redis from 'redis'

redis.RedisClient.prototype.delWildcard = function(key, callback) {
	var redis = this
	console.log('find cache to delete', key)

	redis.keys(key, function(err, rows) {
		console.log(rows)

		if (rows.length) {
			redis.del(rows)
		}
		callback()
	})
}

const client = redis.createClient(process.env.REDIS_URL)
const getAsync = promisify(client.get).bind(client)

client.on('connect', () => {
	console.log('Connected to redis')
})
client.on('error', err => {
	console.log(`Error en redis: ${err}`)
})

class Cache {
	constructor(ttlSeconds = null) {
		if (ttlSeconds) {
			this.ttlSeconds = ttlSeconds // segundos
		}
	}

	async get(key, storeFunction) {
		let data = await getAsync(key)

		if (!data) {
			console.log('Sin cache', key)
			return storeFunction().then(result => {
				if (this.ttlSeconds) {
					client.set(key, JSON.stringify(result), 'EX', this.ttlSeconds)
				} else {
					client.set(key, JSON.stringify(result))
				}
				return result
			})
		}

		console.log('cache-get: ', key)
		return JSON.parse(data)
	}

	async add(key, storeFunction) {
		console.log('cache-add: ', key)
		return storeFunction().then(result => {
			if (this.ttlSeconds) {
				client.set(key, JSON.stringify(result), 'EX', this.ttlSeconds)
			} else {
				client.set(key, JSON.stringify(result))
			}
			return result
		})
	}

	del(key) {
		console.log('cache-del: ', key)
		client.delWildcard(key, () => {
			console.log('delete cache finish')
		})
	}

	flush() {
		console.log('cache-flushAll')
		client.flushall('ASYNC')
	}
}

export default Cache
