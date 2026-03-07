
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

/*const { createProxyMiddleware } = require('http-proxy-middleware');*/

const app = express()

/*
app.use('/api', createProxyMiddleware({
  target: 'http:/localhost:3003', // The address of your actual backend server
  changeOrigin: true, // Needed for virtual hosted sites
  // Optional: Add pathRewrite if the backend path is different
  // pathRewrite: {
  //   '^/api': '', // remove '/api' prefix when forwarding
  // },
  onProxyReq: (proxyReq, req, res) => {
    // Optional: add custom headers, logging, etc.
  console.log("chiamato proxy")
  },
}));
*/

logger.info('connecting to MongoDB'/*, config.MONGODB_URI*/)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

/**/
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)
/**/

app.use("/bloglist/", express.static(__dirname + '\\dist'))/**/
app.use(express.static(__dirname + '\\dist'))/**/

app.use(express.json())
app.use(middleware.requestLogger) 

//app.use(middleware.tokenExtractor)
app.use('/bloglist/api/blogs', notesRouter)
//app.use('/bloglist/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/bloglist/api/users', usersRouter)
app.use('/bloglist/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app