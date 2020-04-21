var mongoose = require('mongoose'),
  Feature = mongoose.model('Feature');

exports.list_all_features = function(req, res) {
  Feature.findRandom({}, {}, {limit: 99}, function(err, feature) {
    if (err)
      res.send(err);
    res.json(feature);
    console.log(feature);
  }).sort({createdDate:-1}).populate('createdBy');
};

exports.create_a_feature = function(req, res) {
  var newFeature = new Feature(req.body);
  newFeature.save(function(err, feature) {
    if (err)
      res.send(err);
    console.log(feature);
    res.json(feature);
  });
};

exports.read_a_feature = function(req, res) {
  console.log(req.params.projectId);
  Feature.findById(req.params.featureId, function(err, feature) {
    if (err)
      res.send(err);
    res.json(feature);
  }).populate('createdBy');
};

exports.update_a_feature = function(req, res) {
  Feature.findOneAndUpdate({_id: req.params.featureId}, req.body, {new: true}, function(err, feature) {
    if (err)
      res.send(err);
    res.json(feature);
  });
};

exports.delete_a_feature = function(req, res) {
  Feature.remove({
    _id: req.params.featureId
  }, function(err, feature) {
    if (err)
      res.send(err);
    res.json({ feature:feature, message: 'project successfully deleted' });
  });
};

