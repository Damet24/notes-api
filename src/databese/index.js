const Sequelize = require('sequelize')

const NoteModel = require('../models/Note')

const sequelize = new Sequelize(
  'notes',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
)

module.exports = {
  Note: NoteModel(sequelize, Sequelize)
}
