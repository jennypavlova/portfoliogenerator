var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
//Models
var User = require('../models/user');

module.exports = function(router) {

  passport.use(new LocalStrategy(User.authenticate()));
  // route to log in
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/#!/portfolio',
    failureRedirect: '/#!/login',
    failureFlash: false
  }));
  router.post('/register', function(req, res, next) {
      User.register(new User({ name:{first: req.body.first, last: req.body.last}, username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
          return next(err);
        }
        res.redirect('/#!/login');
        return next();
      });
  });
  // route to test if the user is logged in or not
  router.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0')
  });
  // route to log out
  router.post('/logout', function(req, res){
    req.logOut();
    res.send(200);
  });
}