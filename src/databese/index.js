const Sequelize = require('sequelize')
require('dotenv').config()

const NoteModel = require('../models/Note')
const UserModel = require('../models/User')

const isTesting = process.env.NODE_ENV === 'test'

const sequelize = new Sequelize(
  isTesting ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
)

const Note =NoteModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize)

User.hasMany(Note, { foreignKey: { allowNull: false, }, })

sequelize.sync()

module.exports = {
  Note,
  User,
  sequelize
}
