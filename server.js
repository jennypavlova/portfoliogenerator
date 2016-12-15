// call the packages we need
var express = require('express');        
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
// log requests to the console (express4)
var morgan = require('morgan'); 
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');
var path = require('path')
var config = require('./config.json')

mongoose.connect('mongodb://127.0.0.1/users');

// define our app using express
var app = express();                 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// RETURN THE CLIENT VIEW
app.get('/', function(req, res){
  res.render('index', config.client);
});

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', require('./app/routes/api'));

// START THE SERVER
// set our port
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Server listen on port ' + port);
