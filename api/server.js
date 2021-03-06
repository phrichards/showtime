'use strict'

const mongoose = require('mongoose')
const express = require('express')
const path = require('path')

const { Error } = mongoose
const { ValidationError } = Error

// 1. Create main express intance
const app = express()

// 2. Require routes
const { router: showRoutes } = require('./routes/shows/showRoutes')
const { userRouter: userRoutes } = require('./routes/users/userRoutes')

// const handleValidationError = require('./middleware/handleValidatorError')
// const handleErrors = require('./middleware/handleErrors')

// 3. Require conatants
const { URL, PORT } = require('./utils/constants')

const publicPath = path.resolve(__dirname, '..', 'build')
app.use('/', express.static(publicPath))

// 4. Ensure that the router is parsing the request body to appropriately format incoming requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 5. Utilise routes
app.use('/api/shows', showRoutes)
app.use('/api/users', userRoutes)

app.use('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

// 6. Define configuration for mongodb
const MONGO_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Probably handle some errors
// [redirect, 404, client error, server error]
app.use((err, req, res, next) => {

})

// 7. Start server
mongoose
  .connect(URL, MONGO_CONFIG)
  .then(async () => {
    console.log(`Connected to database at ${URL}`)
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
