// call the packages we need
var express = require('express');        
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var User = require('./app/models/user.js')

mongoose.connect('mongodb://127.0.0.1/users');

var app = express();                 // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//  GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Home Page' });   
});

router.route('/users')
	// create a user (accessed at POST http://localhost:8080/api/user)
	.post(function(req, res) {
		var user = new User({
			name:{
				first: "Pesho",
				last: "Peshev"
			}
		});
	    user.first = req.body.first;  // set the users name (comes from the request)
	    user.last = req.body.last;  // set the users name (comes from the request)

	    // save the user and check for errors
		user.save(function(err) {
			if (err)
				res.send(err); 
			res.json({ message: 'User created!' });
		})
	})     
	.get(function(req, res) {
		User.find(function(err, user) {
	            if (err)
	                res.send(err);
	            res.json(user);
	        });
		
	});
	console.log("log after save")

	router.route('/user/:user_id')

	    // get the user with that id (accessed at GET http://localhost:8080/api/user/:user_id)
	    .get(function(req, res) {
	        User.findById(req.params.user_id, function(err, user) {
	            if (err)
	                res.send(err);
	            res.json(user);
	        });
	    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listen on port ' + port);