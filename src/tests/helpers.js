const supertest = require('supertest')
const { app } = require('../index')

const api = supertest(app)

const initialNotes = [
	{
		description: "Primera nota de prueba",
		important: false
	},
	{
		description: "Segunda nota de prueba",
		important: true
	},
]

module.exports = {
	api,
	initialNotes
}
