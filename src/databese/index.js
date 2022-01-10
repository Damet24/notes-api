const Sequelize = require('sequelize')
require('dotenv').config()

const NoteModel = require('../models/Note')

const isTesting = process.env.NODE_ENV === 'test'

console.log(isTesting)

const sequelize = new Sequelize(
  isTesting ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
)

sequelize.sync()

module.exports = {
  Note: NoteModel(sequelize, Sequelize),
  sequelize
}
