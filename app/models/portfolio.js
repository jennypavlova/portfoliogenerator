var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
    project :{
		name: {
			type: String,
	    	//    required: true
    	},
        client: {
            type: String
        }
    },
	duration: {
        from: {
            type: Date
        },
        to: {
            type: Date
        }
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
