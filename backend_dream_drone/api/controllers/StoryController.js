var mongoose = require('mongoose'),
  Story = mongoose.model('Story');

exports.list_all_stories = function(req, res) {
  Story.find({}, function(err, story) {
    if (err)
      res.send(err);
    res.json(story);
    console.log(story);
  }).sort({createdDate:-1}).populate('createdBy');
};

exports.create_a_story = function(req, res) {
  var newStory = new Story(req.body);
  newStory.save(function(err, story) {
    if (err)
      res.send(err);
    console.log(story);
    res.json(story);
  });
};

exports.read_a_story = function(req, res) {
  Story.findById(req.params.storyId, function(err, story) {
    if (err)
      res.send(err);
    res.json(story);
  }).populate('createdBy');
};

exports.update_a_story = function(req, res) {
  Story.findOneAndUpdate({_id: req.params.storyId}, req.body, {new: true}, function(err, story) {
    if (err)
      res.send(err);
    res.json(story);
  });
};

exports.delete_a_story= function(req, res) {
  Story.remove({
    _id: req.params.storyId
  }, function(err, story) {
    if (err)
      res.send(err);
    res.json({ story:story, message: 'Story successfully deleted' });
  });
};
