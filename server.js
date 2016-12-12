// call the packages we need
var express = require('express');        
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan = require('morgan'); // log requests to the console (express4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (express4)
var User = require('./app/models/user.js');

mongoose.connect('mongodb://127.0.0.1/users');

var app = express();                 // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride());

var port = process.env.PORT || 8080;        // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', require('./app/routes/api'));

app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listen on port ' + port);
