module.exports = function(app) {
  var feature = require('../controllers/FeatureController');

  // project Routes
  app.route('/features')
    .get(feature.list_all_features)
    .post(feature.create_a_feature);

  app.route('/features/:featureId')
    .get(feature.read_a_feature)
    .put(feature.update_a_feature)
    .delete(feature.delete_a_feature);
};
