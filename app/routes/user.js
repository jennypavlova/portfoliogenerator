var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
//Models
var User = require('../models/user');

module.exports = function(router) {

  passport.use(new LocalStrategy(User.authenticate()));

  router.post('/login', passport.authenticate(' local', {
    successRedirect: '/portfolio',
    failureRedirect: '/login',
    failureFlash: false
  }));

  router.post('/register', function(req, res, next) {
      User.register(new User({ name:{first: req.body.first, last: req.body.last}, username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
          return next(err);
        }
        res.redirect('/login');
        return next();
      });
  });
    // create a user (accessed at POST http://localhost:8080/api/user)
  // router.post('/users', function(req, res) {
  //   var user = new User({ 
  //     name:{
  //       first: "name",
  //       last: "lastname"
  //     },
  //       username: "name",
  //       password: "123"
  //   });
  //   user.first = req.body.first;  // set the users name (comes from the request)
  //   user.last = req.body.last;  // set the users name (comes from the request)

  //   // save the user and check for errors
  //   user.save(function(err) {
  //     if (err)
  //       res.send(err); 
  //     res.json({ message: 'User created!' });
  //   })
  // })     
  router.get('/users', function(req, res) {
    User.find(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    })
  })

}