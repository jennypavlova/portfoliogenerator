var mongoose = require('mongoose');

var portfolioschema = mongoose.Schema({
    project : String
});

module.exports = mongoose.model('Portfolio', portfolioschema);
