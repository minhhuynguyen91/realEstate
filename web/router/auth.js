const mongoose = require('mongoose');

var User = mongoose.model('User');

exports.requireLogin = function(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
};

exports.post = function(req, res) {
  
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err || !user) {
      var err = new Error('Wrong email or password.');
      console.log(err);
      return res.render('authenticate/login');
    
    } else {
      req.session.userId = user._id;
      return res.redirect('/') ;
    }
  });
};

exports.get = function(req, res) {
  res.render('authenticate/login', {session: req.session});
};

exports.logout = function(req, res) {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err) {
      res.send('Something wrong happened when logging out!');
      } else {
      res.redirect('/');
    }
    });
  }
};