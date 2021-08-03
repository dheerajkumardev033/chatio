const express = require('express')
const router = express.Router()
const authorization = require('../../../middleware/authorization')
const con = require('../../../database/db')

/* All Notification */
router.get('/', authorization, (req, res, next) => {
    const uid  = req.uid
    con.query(`SELECT id, title, updated_at AS updatedOn FROM notifications WHERE uid='${uid}'`, (err, result) => {
        if (err) {
            return next(httpError(400, err.message))
        } else {
            return res.status(200).json(result)
        }
    })
})

/* Delete Notification */
router.delete('/:id', authorization, (req, res, next) => {
   const { id } = req.params
   return res.status(200).json({'id': id})
})

module.exports = router