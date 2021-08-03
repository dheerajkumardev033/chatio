const firebase = require('firebase')
const firebaseAdmin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
require('firebase/auth')

const auth = firebase.initializeApp({
  apiKey: process.env.FIREBAE_API_KEY,
  authDomain: process.env.FIREBAE_AUTH_DOMAIN,
  projectId: process.env.FIREBAE_PROJECT_ID,
  storageBucket: process.env.FIREBAE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBAE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBAE_APP_ID,
  measurementId: process.env.FIREBAE_MEASUREMENT_ID
})

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
})

module.exports = { admin, auth }