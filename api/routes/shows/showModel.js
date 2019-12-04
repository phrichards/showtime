'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Map to fields in the DB
const showSchema = exports.schema = new Schema({
  artists: Array,
  date: String,
  time: String,
  venue: String,
  seen: Boolean,
  ticket: Boolean,
  notes: String
})

exports.model = mongoose.model('Show', showSchema)
