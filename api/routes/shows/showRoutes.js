'use strict'

const express = require('express')
const router = express.Router()

const showService = require('./showService')

// GET /shows/
router.route('/')
  .get(async (req, res, next) => {
    try {
      // 1. Fetch all shows from database
      const shows = await showService.listShows()
      // 2. Respond with list of shows
      res.status(200).send({
        data: shows
      })
    } catch (e) {
      // 3. If error, send to the error handler
      next(e)
    }
  })

// POST /shows/
// TODO: don't return 200 if no data is passed. What should be required?

// TODO: When adding, do we validate date and time? pickers are best way to go
router.route('/add')
  .post(async (req, res, next) => {
    // 1. Get data from request body
    // Format of the request for this destructuring would look like:
    /*
      {
        "showData": {
          "artists": ["slowthai", "BROCKHAMPTON"],
          "date": "November 29, 2019",
          "time": "7:00pm",
          "venue": "Ricoh Coliseum",
          "seen": false,
          "ticket": true
        }
      }
    */
    // Play around with the destructuring if you would like the request to be sent in a different way
    const { body } = req

    try {
      // 2. Create show from data
      const show = await showService.createShow(body)
      // 3. Respond with created show
      res.status(200).send({
        data: [show]
      })
    } catch (e) {
      // 4. If error, send to the error handler
      next(e)
    }
  })

// TOOD: Pass JSON body of request (show) to service
router.route('/update/:showId')
  .put(async (req, res, next) => {
    const { params } = req
    const { showId } = params
    const showData = req.body
  
    try {
      // 2. Create show from data
      const show = await showService.updateShow(showId, showData)
      // 3. Respond with created show
      res.status(200).send({
        data: [show]
      })
    } catch (e) {
      // 4. If error, send to the error handler
      next(e)
    }
  })

// TODO send back a 204, not the show that was just deleted
router.route('/delete/:showId')
  .delete(async (req, res, next) => {
    const { params } = req
    const { showId } = params
    try {
      // 2. Create show from data
      const show = await showService.deleteShow(showId)
      // 3. Respond with created show
      res.status(204).send({
        data: [show]
      })
    } catch (e) {
      // 4. If error, send to the error handler
      next(e)
    }
  })

exports.router = router
