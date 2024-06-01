import dotenv from 'dotenv'
import express, { json } from 'express'
import { operationsRouter } from './routes/openai.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
dotenv.config()
app.disable('x-powered-by')

// Middleware
app.use(json())
app.use(corsMiddleware())

// EndPoints
app.get('/', (req, res) => {
  res.json({
    message: 'API connected'
  })
})

app.use('/openai', operationsRouter)

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found'
  })
})

// Server listening
const port = process.env.PORT ?? 1234

app.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`)
})
