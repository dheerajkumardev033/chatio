const { admin } = require('./firebase')

module.exports = (req, res, next) => {
   const { authorization } = req.headers
   if (authorization) {
      admin.auth().verifyIdToken(authorization)
      .then ( (decodedToken) => {
         req.uid = decodedToken.uid
         return next()
      })
      .catch(() => {
         return res.status(403).json({'error': 'Unauthorized'})
       })
   } else {
      return res.status(403).json({'error': 'Unauthorized'})
   }
}
