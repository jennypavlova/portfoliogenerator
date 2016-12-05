//Dependencies
var express = require('express');
var router = express.Router();
var User = require("../models/user");

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
router.use(expressSession({secret: 'mySecretKey', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
router.use(passport.initialize());
router.use(passport.session());


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require("./portfolio")(router);
require("./user")(router);

//Return router
module.exports = router;