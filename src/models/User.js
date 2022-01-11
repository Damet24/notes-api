module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: type.STRING,
    name: type.STRING,
    passwordHash: type.STRING
  })
}