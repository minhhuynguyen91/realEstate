var mongo = require('mongodb');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Category = mongoose.model('Category');


exports.index = function(req, res) {
  res.render('homes/index')

}


exports.id = function(req, res) {

}

exports.new = function(req, res) {
  const product = {};
  Category.find()
    .then((categories) => {
        res.render('products/new', {
        session : req.session,
        categories,
        product
      })

    })

    .catch((err) => {
      console.log(err);
      res.send('cannot get the categories');
    })

}

exports.post = function(req, res) {


}

exports.edit = function(req, res) {

}

exports.put = function(req, res) {

}

exports.delete = function(req, res) {

}