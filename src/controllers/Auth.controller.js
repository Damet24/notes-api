const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const ResponseNormilize = require('../models/ResponseNormilize')
const { User } = require('../databese')

async function LogIn(request, response){
  const { body } = request
  const { username } = body

  if(body.username && body.passwordHash){
    const user = await User.findOne({ where: { username } })
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.passwordHash, user.dataValues.passwordHash)

    if(!(user && passwordCorrect)) return response.status(401).json(ResponseNormilize(401, 'Invalid user or password'))

    const payload = { ...user.dataValues }
    const token = JWT.sign(payload, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24 * 7})

    return response.status(200).json(ResponseNormilize({user, token}))
  }
  else return response.status(400).json(ResponseNormilize(400))
}

module.exports = {
  LogIn
}
