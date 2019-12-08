'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../users/userModel');

// Map to fields in the DB
const showSchema = exports.schema = new Schema({
  artists: Array,
  date: String,
  time: String,
  venue: String,
  seen: Boolean,
  ticket: Boolean,
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

exports.model = mongoose.model('Show', showSchema)
