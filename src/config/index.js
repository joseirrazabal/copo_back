import dotenv from 'dotenv'

dotenv.config()

const config = {
	host: process.env.GRAPHQL_HOST,
	port: process.env.GRAPHQL_PORT,
	elastic: {
		url: process.env.ELASTIC_URL
	},
	mongo: {
		url: process.env.MONGO_URL
	},
	mysql: {
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		host: process.env.MYSQL_HOST,
		database: process.env.MYSQL_DATABASE,
		connections: process.env.MYSQL_CONNECTIONS || 5
	},
	email: {
		operator: process.env.OPERATOR_EMAIL
	},
	sabre: {
		queue_reject: process.env.SABRE_PAYMENT_REJECT_QUEUE,
		queue_reservation: process.env.SABRE_RESERVATION_QUEUE,
		queue_tiketing: process.env.SABRE_TICKETING_QUEUE,
		endpoint: {
			rest: process.env.NODE_ENV === 'production' ? 'https://api.havail.sabre.com' : 'https://api.test.sabre.com',
			xml:
				process.env.NODE_ENV === 'production'
					? 'https://webservices.havail.sabre.com'
					: 'https://sws-crt.cert.havail.sabre.com'
		},
		userId: process.env.SABRE_USERNAME,
		clientSecret: process.env.SABRE_PASSWORD,
		pcc: process.env.SABRE_PCC,
		domain: process.env.SABRE_DOMAIN,
		formatVersion: 'V1',
		timeout: process.env.SABRE_TIMEOUT || 15000
	},
	basset: {
		useBasset: Boolean(Number(process.env.USE_BASSET)),
		// url: process.env.NODE_ENV === 'production' ? 'https://api.basset.ws' : 'https://dev.api.basset.ws',
		url: 'https://api.basset.ws',
		client: process.env.BASSET_CLIENT,
		key_reservations: process.env.BASSET_KEY_RESERVATIONS,
		key_others: process.env.BASSET_KEY_OTHERS
	}
}

export default config
