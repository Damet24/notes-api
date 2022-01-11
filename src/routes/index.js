const { Router } = require('express')
const { GetNotes, GetNote, UpdateNote, DeleteNote, CreateNote } = require('../controllers/Note.controller')
const { CreateUser } = require('../controllers/User.controller')
const router = Router()

router.get('/note', GetNotes)
router.get('/note/:id', GetNote)
router.post('/note/new', CreateNote)
router.put('/note/:id', UpdateNote)
router.delete('/note/:id', DeleteNote)

router.post('/user', CreateUser)

module.exports = router
