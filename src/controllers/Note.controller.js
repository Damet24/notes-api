const { Note } = require('../databese/index')
const ResponseNormilize = require('../models/ResponseNormilize')

function GetNotes(request, response){
  Note.findAll().then(data => {
    response.json(ResponseNormilize(data))
  })
}

function CreateNote(request, response){
  Note.create(request.body)
    .then(data => response.json(ResponseNormilize(data)))
}

function GetNote(request, response){
  Note.findOne({where: { id: request.params.id }})
    .then(data => {
      response.json(ResponseNormilize(data))
    })
}

async function UpdateNote(request, response){
  const note = await Note.findOne({ where: { id: request.params.id } })
  if(note !== null){
    note.set(request.body)
    const res = await note.save()
    response.send(ResponseNormilize(res))
  }
  else response.json(ResponseNormilize(null))
}

async function DeleteNote(request, response){
  const note = await Note.findOne({ where: { id: request.params.id } })
  if(note === null) return response.json(ResponseNormilize(note))
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
