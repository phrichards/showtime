'use strict'

const { model: Show } = require('./showModel')

// Helper function to list each of the showsshows in the database
exports.listShows = async () => {
  try {
    const shows = await Show.find({})
    return shows
  } catch (e) {
    throw e
  }
}

exports.getShow = async (showId) => {
  try {
    const show = await Show.findById(showId)
    return show || {}
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Create a new show that will be added to the database
exports.createShow = async (showData = {}) => {
  
  // 1. Create a show instance
  try {
    const show = new Show(showData)
    // 2. Save show to database
    const doc = await show.save()
    // 3. return with created show
    return doc
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e
  }
}

// Update an existing show
// TODO: Find show by ID, update with post data
exports.updateShow = async (showId, showData) => {
  const show = await Show.findById(showId)

  const {
    artists,
    date,
    time,
    venue,
    seen,
    ticket
  } = showData

  show.artists = artists ? artists : show.artists,
  show.date = date ? date : show.date,
  show.time = time ? time : show.time,
  show.venue = venue ? venue : show.venue,
  show.seen = seen
  show.ticket = ticket

  try {
    // 2. Save show to database
    const doc = await show.save()
    // 3. return with created show
    return doc
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e
  }
}

// Create a new show that will be added to the database
exports.deleteShow = async (showId) => {
  // 1. Create a show instance
  const show = await Show.findById(showId)
  console.log('show in delete service', show)
  try {
    // 2. Save show to database
    const deleted = await show.remove({_id: showId})
    // 3. return with created show
    return deleted
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e
  }
}