
const { User, sequelize } = require('../databese/index')
const { server } = require('../index')
const { api, initialUsers, GetUsers } = require('./helpers')

beforeEach(async () => {
	await User.destroy({ where: {}})
	const { name, username, _passwordHosh } = initialUsers[0]
	await User.create({ name, username, passwordHash: _passwordHosh })
})

describe('authorization user', () => {
	test('login a user', async () => {
		await api.post('/api/auth/login')
			.send(initialUsers[0])
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('login a user', async () => {
		const { name, username, _passwordHosh } = initialUsers[0]

		await api.post('/api/auth/login')
			.send({ name, username })
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
})

afterAll(() => {
	sequelize.close()
	server.close()
})
