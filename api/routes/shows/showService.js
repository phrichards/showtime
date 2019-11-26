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

// Create a new show that will be added to the database
exports.createShow = async (showData) => {
  console.log(showData)
  // 1. Create a show instance
  const show = new Show(showData)
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

// Update an existing show
// TODO: Find show by ID, update with post data
exports.updateShow = async (showId, showData) => {
  const show = await Show.findById(showId)
  const {
    lineup,
    date,
    time,
    location,
    seen,
    ticket
  } = showData
  
  show.lineup = lineup || show.lineup,
  show.date = date || show.date,
  show.time = time || show.time,
  show.location = location || show.location,
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