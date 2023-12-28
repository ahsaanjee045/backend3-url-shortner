const express = require('express')
const { createShortURL } = require('../controllers/url.controller')


const router = express.Router()

router.post("/create", createShortURL)

module.exports = router