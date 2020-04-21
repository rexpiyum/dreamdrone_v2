var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');



var droneSchema = new Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  features: [{type: mongoose.Schema.Types.ObjectId, ref: 'Feature'}],

  mainStory: {type: mongoose.Schema.Types.ObjectId, ref: 'Story'},

  subStories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Story'}],

  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  isFlagged: {
    type: Boolean,
    default: false
  },

  createdDate: {
    type: Date,
    default: Date.now
  },
  
});

droneSchema.plugin(random);

module.exports = mongoose.model('Drone', droneSchema);
