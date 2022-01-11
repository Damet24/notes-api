const { User, sequelize } = require('../databese/index')
const { server } = require('../index')
const { api, initialUsers, GetUsers } = require('./helpers')

beforeEach(async () => {
	await User.destroy({ where: {}})
	await User.create(initialUsers[0])
})

describe('creating a new user', () => {
	test('works as expected creating a frush username', async () => {
		const usersAtStart = await GetUsers()
		const newUser = {
			username: 'pepe',
			name: 'Pepe',
			passwordHash: 'password'
		}

		await api.post('/api/user')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await GetUsers()
		expect(usersAtEnd.results).toHaveLength(usersAtStart.results.length + 1)

		const usernames = usersAtEnd.results.map(n => n.username)
		expect(usernames).toContain(newUser.username)
	})

	test('user invalid is net created', async () => {
		const usersAtStart = await GetUsers()
		const newUser = {
			username: 'pepe',
			passwordHash: 'password'
		}

		await api.post('/api/user')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await GetUsers()
		expect(usersAtEnd.results).toHaveLength(usersAtStart.results.length)
	})

	test('cannot create a user with the same username', async () => {
		const usersAtStart = await GetUsers()

		const res = await api.post('/api/user')
			.send(initialUsers[0])
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(res.body.status).toBe('Error')

		const usersAtEnd = await GetUsers()
		expect(usersAtEnd.results).toHaveLength(usersAtStart.results.length)
	})
})

afterAll(() => {
	sequelize.close()
	server.close()
})
