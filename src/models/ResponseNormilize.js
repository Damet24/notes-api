
module.exports = function ResponseNormalize(data){
  if(data === null) return {
    status: 'Error',
    message: 'Data not found'
  }

  if(data === 400) return {
    status: 'Error',
    message: 'Bad Request'
  }

  if(Array.isArray(data)) return {
    status: 'Ok',
    results: data.length > 0 ? data.map(item => item.dataValues) : null
  }

  if(data.dataValues.username !== undefined){
    const { passwordHash, ...rest } = data.dataValues
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
