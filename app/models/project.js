// Project Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  name: {
    type: String,
    required: true
  },
  companyName: String,
  description: String,
  duration: {
    startDate: Date,
    endDate: Date
  },
  technologies: String
});

module.exports = mongoose.model('Project', schema);
