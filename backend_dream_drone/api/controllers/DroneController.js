var mongoose = require('mongoose'),
  Drone = mongoose.model('Drone');
  

exports.list_all_drones = function(req, res) {
  Drone.find({}, function(err, drones) {
    if (err)
      res.send(err);
    res.json(drones);
    console.log(drones);
  }).sort({createdDate:1}).populate('mainStory').populate('subStories').populate('createdBy').populate('features');
};


exports.get_random_list_of_drones = function(req, res) {
  Drone.findRandom({isFlagged:{$in:[false]}}, {}, {limit: req.params.count}, function(err, drone) {
    if (err) {
      console(err);
      res.json(err);
    }
    res.json(drone);
  });
};

exports.create_a_drone = function(req, res) {
  var newDrone = new Drone(req.body);
  newDrone.save(function(err, drone) {
    if (err)
      res.send(err);
    console.log(drone);
    res.json(drone);
  });
};

exports.read_a_drone = function(req, res) {
  Drone.findById(req.params.droneId, function(err, drone) {
    if (err)
      res.send(err);
    res.json(drone);
  }).populate('mainStory').populate('subStories').populate('createdBy').populate('features');
};

exports.update_a_drone = function(req, res) {
  Drone.findOneAndUpdate({_id: req.params.droneId}, req.body, {new: true}, function(err, drone) {
    if (err)
      res.send(err);
    res.json(drone);
  });
};

exports.delete_a_drone= function(req, res) {
  Drone.remove({
    _id: req.params.droneId
  }, function(err, drone) {
    if (err)
      res.send(err);
    res.json({ drone:drone, message: 'Drone successfully deleted' });
  });
};
