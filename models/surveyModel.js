var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var SurveySchema = new mongoose.Schema ({
    userID: {
      type: String,
      required: true
  },
    answers: [{
      question: String,
      answer: String
    }],
    date: {
      type: Date,
      required: true
    }
});

var Survey = mongoose.model('Survey', SurveySchema);

module.exports.Survey = Survey;
