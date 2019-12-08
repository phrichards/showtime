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

router.route('/:showId')
  .get(async (req, res) => {
    const { params } = req
    const { showId } = params
    try {
      const show = await showService.getShow(showId)

      if (show) {
        res.json(show)
      } else {
        // we got a bad number
        res.status(404).send()
      }
    } catch (err) {
      console.log('error', err)
      throw(err)
    }
  })

router.route('/user/:userId')
  .get(async (req, res, next) => {
    const { params } = req
    const { userId } = params

    try {
      // 1. Fetch all shows from database
      const shows = await showService.listShowsByUser(userId)
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

router.route('/add')
  .post(async (req, res, next) => {
    // 1. Get data from request body
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

router.route('/delete/:showId')
  .delete(async (req, res, next) => {
    const { params } = req
    const { showId } = params
    try {
      // 2. Create show from data
      const show = await showService.deleteShow(showId)
      // 3. Respond with created show
      res.status(204).json({ data: "Show deleted" })
    } catch (e) {
      // 4. If error, send to the error handler
      next(e)
    }
  })

exports.router = router
