var mongo = require('mongodb');
const mongoose = require('mongoose');
const District = mongoose.model('district');

exports.index = function(req, res) {

}


exports.id = function(req, res) {

}

exports.new = function(req, res) {
  const district = {};
  res.render('districts/new', {
    session : req.session,
    action : "/districts",
    district
  })

}

exports.post = function(req, res) {
  const district = District(req.body)
  district.save()
    .then(() => {
      res.redirect('/');
    ;})

    .catch((err) => {
      console.log(err);
      res.send('Cannot make the new district');
    });
}

exports.edit = function(req, res) {

}

exports.put = function(req, res) {

}

exports.delete = function(req, res) {

}