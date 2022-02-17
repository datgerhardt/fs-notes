const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const noteRouter = require('./controller/note')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use(requestLogger)
app.use(express.static('build'))

app.use('/api/notes', noteRouter)


app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app