var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');



var featureSchema = new Schema({
  title: {
    type: String,
    required: 'Please enter title'
  },
  description: {
    type: String,
    required: 'Please enter description'
  },
  imageURL: {
    type: String,
  },
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  isFlagged: {
    type: Boolean,
    default: false
  },
  
  createdDate: {
    type: Date,
    default: Date.now
  }
});

featureSchema.plugin(random);

module.exports = mongoose.model('Feature', featureSchema);
