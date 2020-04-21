module.exports = function(app) {
  var story = require('../controllers/StoryController');

  // project Routes
  app.route('/stories')
    .get(story.list_all_stories)
    .post(story.create_a_story);

  app.route('/stories/:storyId')
    .get(story.read_a_story)
    .put(story.update_a_story)
    .delete(story.delete_a_story);
};
