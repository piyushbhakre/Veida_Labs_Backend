const express = require('express')
const authRoutes = require('./routes/authRoutes')
const jijiRoutes = require('./routes/jijiRoutes')

const app = express()

app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', jijiRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Jiji API is running' })
})

module.exports = app