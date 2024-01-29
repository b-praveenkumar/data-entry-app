// Entry.js

const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  week: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  staffName: {
    type: String,
    required: true,
  },
  competenciesMet: {
    type: String,
    required: true,
  },
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
