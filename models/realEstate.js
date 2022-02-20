const mongoose = require('mongoose');

const realEstateSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  content: {
    type: String,
    trim: true,
  },

  frontPage: {
    type: Boolean,
    default: false,
  },

  img_thumbnail: {
    type: String,
    trim: true,
    default: null
  },


  img_link: {
    type: String,
    trim: true,
    default: null
  },

  note: {
    type: String,
    trim: true,
    default: null
  },

  displayOrder: {
    type: Number,
    default: 999
  },

  districtId: mongoose.Schema.Types.ObjectId,

  userId: mongoose.Schema.Types.ObjectId,

  created_date: {
    type: Date,
    default: Date.now
  },

  updated_date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('realEstate', realEstateSchema);