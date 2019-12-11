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
    } catch (err) {
      // 3. If error, send to the error handler
      next(err)
    }
  })

router.route('/:showId')
  .get(async (req, res) => {
    const { params } = req
    const { showId } = params
    try {
      const show = await showService.getShow(showId)

      if (show) {
        res.status(200).json({data: [show]})
      } else {
        // we got a bad number
        res.status(404).send()
      }
    } catch (err) {
      next(err)
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
    } catch (err) {
      // 3. If error, send to the error handler
      next(err)
    }
  })

// POST /shows/
// FIXME: don't return 200 if no data is passed. What should be required?
// TODO: verify show doesn't already exist (not sure how)

router.route('/add')
  .post(async (req, res, next) => {
    // 1. Get data from request body
    const { body } = req
    try {
      // 2. Create show from data
      const show = await showService.createShow(body)
      // 3. Respond with created show
      res.status(200).send({ data: [show] })
    } catch (err) {
      // 4. If error, send to the error handler
      next(err)
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
      res.status(200).send({data: [show]})
    } catch (err) {
      // 4. If error, send to the error handler
      next(err)
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
      res.status(204).json({ data: ["Show deleted"] })
    } catch (err) {
      // 4. If error, send to the error handler
      next(err)
    }
  })

exports.router = router
