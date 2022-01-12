const supertest = require('supertest')
const { User } = require('../databese')
const ResponseNormalize = require('../models/ResponseNormilize')
const bcrypt = require('bcrypt')
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

const initialUsers = [
	{
		username: 'damet',
		name: 'Daniel',
		passwordHash: 'password',
		_passwordHosh: bcrypt.hashSync('password', 10)
	}
]

async function GetUsers(){
	return ResponseNormalize(await User.findAll())
}

module.exports = {
	api,
	initialNotes,
	initialUsers,
	GetUsers
}
