var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portfolioschema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  project: {
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
  }
});

module.exports = mongoose.model('Portfolio', portfolioschema);
