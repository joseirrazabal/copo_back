import Form from '../dataSources/form'

const data = ({ mongoClient }) => ({
	form: new Form({ store: mongoClient && mongoClient.db() }),
})

export default data
