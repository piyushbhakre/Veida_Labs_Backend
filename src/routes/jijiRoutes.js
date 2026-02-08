const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const { askJiji } = require('../controllers/jijiController')

router.post('/ask-jiji', authMiddleware, askJiji)

module.exports = router