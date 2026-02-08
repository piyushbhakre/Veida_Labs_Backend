require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Endpoints:`)
  console.log(`   POST /login - Get auth token`)
  console.log(`   POST /ask-jiji - Query Jiji (requires auth)`)
  console.log(`   GET /health - Health check`)
})