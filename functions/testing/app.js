const express = require('express')
const cors = require('cors')

const expressMiddleware = require('aws-serverless-express/middleware')

const app = express()

app.use(cors())

app.use(express.json({ limit: '50mb' }))

app.use(expressMiddleware.eventContext())

app.get('/prueba', async (req, res) => {
  return res.json({ error: 'Esto es una prueba', statusCode: 200, status: '0k' })
})

module.exports = app
