const express = require('express')
const { createShortURL, getLongURL } = require('../controllers/url.controller')


const router = express.Router()

router.post("/create", createShortURL)
router.get("/:shortid", getLongURL)

module.exports = router