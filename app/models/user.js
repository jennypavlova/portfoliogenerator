var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var StudentSchema = new Schema({
    name:{
		first:{
			type: String,
	    	required: true
    	},
    	last: {
    		type: String,
	    	required: true
	    }
    }
    // ,
    // facultyNum:{
    // 	type: Number,
    // 	required: true
    // },
    // academicYear:{
    // 	type: Number,
    // 	required: true
    // },
    // specialty: String,
    // disciplines: [{
    // 	name: String,
    // 	teachers: String,
    // 	hours: Number
    // }],
    // payment: {
    // 	amount: Number,
    // 	date : Date
    // }
});

module.exports = mongoose.model('Student', StudentSchema);
