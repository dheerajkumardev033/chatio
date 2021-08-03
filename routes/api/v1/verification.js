const express = require('express')
const router = express.Router()
const authorization = require('../../../middleware/authorization')
const conn = require('../../../database/db')
const httpError = require('http-errors')

/* Verification */
router.post('/', authorization, (req, res, next) => {
    const uid = req.uid
    const { verificationCode } = req.body
    if (verificationCode) {
        const qry = `SELECT DISTINCT verification_code FROM users WHERE uid='${uid}'`
        conn.query(qry, (err, result) => {
            if (err) {
                return next(httpError(400, err.message))
            } 
            const { verification_code } = result[0]
            if (verificationCode == verification_code) {
                return res.status(200).json({'message': 'Success'})
            } 
            return res.status(400).json({'message': 'Please enter correct OTP'})
        })
    } else {
        return next(httpError(400, 'parameter missing.'))
    }
}) 

/* Resend */
router.get('/resend', authorization, (req, res, next) => {
    const uid = req.uid
    const verificationCode = generateOTP()
    const qry = `UPDATE users SET verification_code = '${verificationCode}' WHERE uid='${uid}'`
    conn.query(qry, (err, result) => {
        if (err) {
            return next(httpError(400, err.message))
        } 
        return res.status(200).json({'message': 'Success', 'code': verificationCode})
    })
})

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
       OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
 }

module.exports = router