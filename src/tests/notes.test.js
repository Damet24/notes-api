const { Note, sequelize } = require('../databese/index')
const { server } = require('../index')
const { api, initialNotes } = require('./helpers')


beforeEach(async () => {
	await Note.destroy({ where: {}, truncate: true })
	await Note.create(initialNotes[0])
	await Note.create(initialNotes[1])
})

describe("get notes", () => {

	test('all notes', async () => {
		await api
			.get('/api/note')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('there are two notes', async () => {
		const response = await api.get('/api/note')
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
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length + 1)
	})

	test('note without content is not added', async () => {
		const newNote = {
			important: false
		}

		await api.post('/api/note/new')
			.send(newNote)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length)
	})

})

describe('update notes', () => {

	test('note can be updated', async () => {
		const updatedNote = {
			description: "La primaro nota actualizada",
			important: false
		}

		await api.put('/api/note/1')
			.send(updatedNote)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
		expect(response.body.status).toBe('Ok')
		expect(response.body.results[0].description).toBe("La primaro nota actualizada")
	})

	test('a invalid note is not updated', async () => {
		const updatedNote = {
			important: false
		}

		await api.put('/api/note/1')
			.send(updatedNote)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length)
	})

})

describe('delete notes', () => {

	test('note can be deleted', async () => {
		await api.delete('/api/note/1')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/note')
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length - 1)
	})

	test('note without id is not deleted', async () => {
		await api.delete('/api/note/').expect(404)
		
		const response = await api.get('/api/note')
		expect(response.body.status).toBe('Ok')
		expect(response.body.results).toHaveLength(initialNotes.length)
	})

})

afterAll(() => {
	sequelize.close()
	server.close()
})
