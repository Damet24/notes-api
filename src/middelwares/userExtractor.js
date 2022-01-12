const JWT = require('jsonwebtoken')
const ResponseNormilize = require('../models/ResponseNormilize')

module.exports = function(request, response, next) {
  const authorization = request.get('authorization')
  let token = null

  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    token = authorization.substring(7)
  }

  let decodedToken = { }
  try{
    decodedToken = JWT.verify(token, process.env.SECRET_KEY)
  } catch(e) {
    return response.status(500).json(ResponseNormilize(401, 'JsonWebTokenError: ' + e.message))
  }

  if(!token || !decodedToken.id)  return response.status(401).json(ResponseNormilize(401, 'Token missing or invalid'))

  request.userId = decodedToken.id
  next()
}
