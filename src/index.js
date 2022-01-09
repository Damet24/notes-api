const express = require('express')
const app = express()
const routes = require('./routes')

require('./databese')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

app.listen(3000, () => console.log('Server on part', 3000))

