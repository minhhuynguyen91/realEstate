exports.index = function(req, res) {
  res.render('homes/index', {session: req.session});
}