const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  displayOrder: {
    type: Number,
    default: 999
  },

  productIds: [{type: mongoose.Schema.Types.ObjectId}],

  created_date: {
    type: Date,
    default: Date.now
  },

  updated_date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Category', categorySchema);