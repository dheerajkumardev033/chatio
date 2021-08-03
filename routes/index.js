const express = require('express')
const router = express.Router()
const pjson = require('../package.json')

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('pages/index', {title:pjson.name})
})

module.exports = router