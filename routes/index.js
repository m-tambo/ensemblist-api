'use strict'

const { Router } = require('express')
const router = Router()

router.use(require('./routes.js'))

router.get('/', (req, res) => {
  res.json({
    "title": "Ensemblist API"
  }) //end of json
})

module.exports = router
