var mongoose = require('mongoose');

var portfolioschema = mongoose.Schema({
    project : {
    	name: {
    		type: String,
    		required: true
    	},
    	companyName: {
    		type: String,
    		required: true
    	},
    	projectDescription: String,
    	duration: {
    		startDate: Date,
    		endDate: Date
    	},
    	technologies: String
    }
});

module.exports = mongoose.model('Portfolio', portfolioschema);
