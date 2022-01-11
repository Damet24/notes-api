const express = require('express')
const app = express()
const routes = require('./routes')

require('./databese')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

const isTesting = process.env.NODE_ENV === 'test'
const PORT = isTesting ? process.env.PORT_TEST : process.env.PORT

const server = app.listen(PORT, () => console.log('Server on part', PORT))

module.exports = { app, server }

