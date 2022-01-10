const express = require('express')
const app = express()
const routes = require('./routes')

require('./databese')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

const server = app.listen(process.env.PORT, () => console.log('Server on part', process.env.PORT))

module.exports = { app, server }

