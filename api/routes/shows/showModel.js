'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Map to fields in the DB
const showSchema = exports.schema = new Schema({
  lineup: Array,
  date: String,
  time: String,
  location: String,
  seen: Boolean,
  ticket: Boolean
})

exports.model = mongoose.model('Show', showSchema)
