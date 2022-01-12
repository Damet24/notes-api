
module.exports = function ResponseNormalize(data, msg = ''){
  if(data === null) return {
    status: 'Error',
    message: 'Data not found ' + msg
  }

  if(data === 400) return {
    status: 'Error',
    message: 'Bad Request ' + msg
  }

  if(data === 401) return {
    status: 'Error',
    message: 'Unauthorized ' + msg
  }

  if(data === 500) return {
    status: 'Error',
    message: 'Internal Server Error ' + msg
  }

  if(Array.isArray(data)) return {
    status: 'Ok',
    results: data.length > 0 ? data.map(item => item.dataValues) : null
  }

  if(data.token !== undefined){
    const { token, user } = data
    const { passwordHash, id, createdAt, updatedAt, ...rest } = user.dataValues
    return {
      ...rest,
      token
    }
  }

  if(data.dataValues.username !== undefined){
    const { passwordHash, id, createdAt, updatedAt, ...rest } = data.dataValues
    return {
      status: 'Ok',
      results: rest
    }
  }
  
  return {
    status: 'Ok',
    results: data.dataValues
  }
}
