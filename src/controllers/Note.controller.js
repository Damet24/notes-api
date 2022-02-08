const { Note } = require('../databese')
const ResponseNormilize = require('../models/ResponseNormilize')

function GetNotes(request, response){
  Note.findAll({ where: { userId: request.userId } }).then(data => {
    response.json(ResponseNormilize(data))
  })
}

function CreateNote(request, response){
  const example = {
		description: "Ultima note de prueba",
    important: false
	}

  console.log(request.body)

  if(JSON.stringify(Object.keys(request.body)) !== JSON.stringify(Object.keys(example))) return response.status(400).json(ResponseNormilize(400))

  Note.create({...request.body, userId: request.userId })
    .then(data => response.status(201).json(ResponseNormilize(data)))
}

function GetNote(request, response){
  Note.findOne({where: { id: request.params.id, userId: request.userId }})
    .then(data => {
      response.json(ResponseNormilize(data))
    })
}

async function UpdateNote(request, response){
  const example = {
		description: "Ultima note de prueba",
		important: false
	}

  if(JSON.stringify(Object.keys(request.body)) !== JSON.stringify(Object.keys(example))) return response.status(400).json(ResponseNormilize(400))

  const note = await Note.findOne({ where: { id: request.params.id } })
  if(note !== null){
    note.set(request.body)
    const res = await note.save()
    return response.status(200).json(ResponseNormilize(res))
  }
  else response.json(ResponseNormilize(null))
}

async function DeleteNote(request, response){
  const note = await Note.findOne({ where: { id: request.params.id } })
  if(note === null) return response.json(ResponseNormilize(null))
  const res = await note.destroy()
  response.json(ResponseNormilize(res))
}

module.exports = {
  GetNotes,
  CreateNote,
  GetNote,
  UpdateNote,
  DeleteNote
}
