var mongo = require('mongodb');
const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.index = function(req, res) {

}


exports.id = function(req, res) {

}

exports.new = function(req, res) {
  const cat = {};
  res.render('categories/new', {
    session : req.session,
    action : "/categories",
    cat
  })

}

exports.post = function(req, res) {
  const cat = Category(req.body)
  cat.save()
    .then(() => {
      res.redirect('/');
    ;})

    .catch((err) => {
      console.log(err);
      res.send('Cannot make the category');
    });
}

exports.edit = function(req, res) {

}

exports.put = function(req, res) {

}

exports.delete = function(req, res) {

}