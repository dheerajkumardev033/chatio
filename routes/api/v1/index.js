const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const verificationRouter = require('./verification')
const notificatonRouter = require('./notifications')

/* Routes */
router.use('/users', userRouter)
router.use('/verification', verificationRouter)
router.use('/notifications', notificatonRouter)


/* GET home page. */
router.get('/', (req, res, next) => {
    res.status(200).send('Api')
})

module.exports = router