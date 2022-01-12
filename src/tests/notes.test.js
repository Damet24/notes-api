const { Note, User, sequelize } = require('../databese/index')
const { server } = require('../index')
const { api, initialNotes, initialUsers } = require('./helpers')

let user = null
let token = ''

beforeEach(async () => {
	await Note.destroy({ where: {}})
	await User.destroy({ where: {}})

	const { name, username, passwordHash, _passwordHosh } = initialUsers[0]
	const _user = await User.create({ name, username, passwordHash: _passwordHosh })

	user = await api.post('/api/auth/login')
		.send(initialUsers[0])

	token = JSON.parse(user.res.text).token

	await  api.post('/api/note/new')
			.set('authorization', `Bearer ${token}`)
			.send(initialNotes[0])

	await  api.post('/api/note/new')
			.set('authorization', `Bearer ${token}`)
			.send(initialNotes[1])
})

describe("get notes", () => {

	test('all notes', async () => {
		await api
			.get('/api/note')
			.set('authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('there are two notes', async () => {
		const response = await api.get('/api/note').set('authorization', `Bearer ${token}`)
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length)
	})

})

describe("add notes", () => {

	test('a valid note can be added', async () => {
		const newNote = {
			description: "Ultima note de prueba",
			important: false
		}

		await api.post('/api/note/new')
			.set('authorization', `Bearer ${token}`)
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
			.set('authorization', `Bearer ${token}`)
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length + 1)
	})

	test('note without content is not added', async () => {
		const newNote = {
			important: false
		}

		await api.post('/api/note/new')
			.set('authorization', `Bearer ${token}`)
			.send(newNote)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
			.set('authorization', `Bearer ${token}`)
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length)
	})

})

describe.skip('update notes', () => {

	test('note can be updated', async () => {
		const updatedNote = {
			"description": "Otra nota bonita :3",
			"important": false
		}

		await api.put('/api/note/1')
			.set('authorization', `Bearer ${token}`)
			.send(updatedNote)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
			.set('authorization', `Bearer ${token}`)

		expect(response.body.status).toBe('Ok')
		expect(response.body.results[0].description).toBe(updatedNote.description)
	})

	test('a invalid note is not updated', async () => {
		const updatedNote = {
			important: false
		}

		await api.put('/api/note/1')
			.set('authorization', `Bearer ${token}`)
			.send(updatedNote)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
			.set('authorization', `Bearer ${token}`)
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length)
	})

})

describe.skip('delete notes', () => {

	test('note can be deleted', async () => {
		await api.delete('/api/note/1')
			.set('authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
			.set('authorization', `Bearer ${token}`)
		expect(response.body.status).toBe('Ok')
		console.log(response.body.results)
		expect(response.body.results).toHaveLength(initialNotes.length - 1)
	})

	test('note without id is not deleted', async () => {
		await api.delete('/api/note/').set('authorization', `Bearer ${token}`).expect(404)
		
		const response = await api.get('/api/note')
			.set('authorization', `Bearer ${token}`)
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length)
	})

})

afterAll(() => {
	sequelize.close()
	server.close()
})
