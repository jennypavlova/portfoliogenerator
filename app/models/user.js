var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    name:{
		first:{
			type: String
    	},
    	last: {
    		type: String
	    }
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});
// passportjs plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
