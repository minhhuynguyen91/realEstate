const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  content: {
    type: String,
    trim: true,
  },

  quantity: {
    type: Number,
    default: 0
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

  categoryId: mongoose.Schema.Types.ObjectId,

  created_date: {
    type: Date,
    default: Date.now
  },

  updated_date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Product', productSchema);