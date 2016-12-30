var mongoose = require('mongoose');

var portfolioschema = mongoose.Schema({
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
