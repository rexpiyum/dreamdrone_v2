module.exports = function(app) {
  var drone = require('../controllers/DroneController');


  app.route('/drones')
    .get(drone.list_all_drones)
    .post(drone.create_a_drone);

  app.route('/random/drones/:count')
    .get(drone.get_random_list_of_drones);
    

  app.route('/drones/:droneId')
    .get(drone.read_a_drone)
    .put(drone.update_a_drone)
    .delete(drone.delete_a_drone);
};
