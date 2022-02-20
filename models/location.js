const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  cityName: {
    type: String,
    trim: true,
  },
  
  districtName: {
    type: String,
    trim: true,
  },

  displayOrder: {
    type: Number,
    default: 999
  },

  realEstateIds: [{type: mongoose.Schema.Types.ObjectId}],

  created_date: {
    type: Date,
    default: Date.now
  },

  updated_date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Location', locationSchema);