const express = require('express')
const router = express.Router()
const authorization = require('../../../middleware/authorization')
const { admin, auth } = require('../../../middleware/authorization/firebase')
const conn = require('../../../database/db')
const httpError = require('http-errors')

//All User
router.get('/', authorization, (req, res, next) => {
   return res.status(200).json({ 'userID': req.uid })
})

//Create User
router.post('/', authorization, (req, res, next) => {
   const uid = req.uid
   const { firtName, lastName, email, phoneNumber } = req.body
   if (firtName && lastName && email && phoneNumber) {
      const qry = `INSERT INTO users (uid, first_name, last_name, email, phone_number, verification_code) VALUES ('${uid}', '${firtName}', '${lastName}', '${email}', '${phoneNumber}', '666666')`
      conn.query(qry, (err, result) => {
         if (err) {
            return next(httpError(400, err.message))
         } else {
            return res.status(200).json({ 'message': 'Successfully created'})
         }
      })
   } else {
      return next(httpError(400, 'parameter missing.'))
   }
})
// Get Specific user
router.get('/:id', (req, res, next) => {
   const { id } = req.params
   return res.status(200).json({ 'id': id })
})

//Delete User
router.delete('/:id', (req, res, next) => {
   const { id } = req.params
   return res.status(200).json({ 'id': id })
})

//Update user
router.put('/:id', (req, res, next) => {
   const { id } = req.params
   return res.status(200).json({ 'id': id })
})
router.patch('/:id', (req, res, next) => {
   const { id } = req.params
   return res.status(200).json({ 'id': id })
})

/// Testing Funcation
router.post('/create', (req, res, next) => {
   const { email, password } = req.body
   if (email && password) {
      admin
      .auth()
      .createUser({
         email: email,
         emailVerified: false,
         password: password,
         disabled: false,
      })
      .then((userRecord) => {
         return res.status(200).json(userRecord)
      })
      .catch((err) => {
         return next(httpError(401, err.message))
      })
   } else {
      return next(httpError(400, 'parameter missing.'))
   }
})
router.post('/token', (req, res, next) => {
   const { email, password } = req.body
   if (email && password) {
      auth
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
         userCredential.user.getIdToken(true)
            .then(idToken => {
               return res.status(200).json({ 'token': idToken })
            })
            .catch((err) => {
               return next(httpError(401, err.message))
            })
      })
      .catch((err) => {
         return next(httpError(401, err.message))
      })
   } else {
      return next(httpError(400, 'parameter missing.'))
   }
}) 

module.exports = router