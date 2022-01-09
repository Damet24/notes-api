
module.exports = function ResponseNormalize(data){
  if(data === null) return {
    status: 'Error',
    message: 'Data not found'
  }

  if(Array.isArray(data)) return {
    status: 'Ok',
    results: data.map(item => item.dataValues)
  }
  
  return {
    status: 'Ok',
    results: data.dataValues
  }
}
