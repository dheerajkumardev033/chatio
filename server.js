const express = require('express')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const logger = require('morgan')
const path = require('path')
require('dotenv').config()

const indexRouter = require('./routes/index')
const apiV1Route = require('./routes/api/v1')

/* App setup */
const app = express()
const port = process.env.PORT || 3000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/* Routes */
app.use('/', indexRouter)
app.use('/api/v1', apiV1Route)

/* Catch 404 and forward to error handler */
app.use( (req, res, next) => {
  next(createError(404))
})

/* Error handler */
app.use((err, req, res, next) => {
  res.status(err.status).json({'error': err.message})
// res.render('pages/error', {statusCode: err.statusCode, message: err.message})
})

/* Server Listening */
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
