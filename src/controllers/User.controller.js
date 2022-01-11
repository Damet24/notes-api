const ResponseNormilize = require('../models/ResponseNormilize')
const bcrypt = require('bcrypt')
const { User } = require('../databese')

async function CreateUser(request, response){
  const example = {
    username: "username",
    name: "name",
    passwordHash: "password"
  }

  if(JSON.stringify(Object.keys(request.body)) !== JSON.stringify(Object.keys(example))) return response.status(400).json(ResponseNormilize(400))

  const _user = await User.findOne({ where: { username: request.body.username } })
  if(_user !== null) return response.status(400).json(ResponseNormilize(400))

  const { passwordHash, ...rest } = request.body
  const hash = bcrypt.hashSync(passwordHash, 10)

  const user = await User.create({ passwordHash: hash, ...rest })
  response.status(201).json(ResponseNormilize(user))
}

module.exports = {
  CreateUser
}
