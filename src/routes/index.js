const { Router } = require('express')
const { GetNotes, GetNote, UpdateNote, DeleteNote, CreateNote } = require('../controllers/Note.controller')
const { CreateUser } = require('../controllers/User.controller')
const { LogIn } = require('../controllers/Auth.controller')
const userExtractor = require('../middelwares/userExtractor')
const router = Router()

router.get('/note', userExtractor, GetNotes)
router.get('/note/:id', userExtractor, GetNote)
router.post('/note/new', userExtractor, CreateNote)
router.put('/note/:id', userExtractor, UpdateNote)
router.delete('/note/:id', userExtractor, DeleteNote)

router.post('/user', CreateUser)

router.post('/auth/login', LogIn)

module.exports = router
