var express = require("express"),
  app = express(),
  port = process.env.PORT || 80,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
  const path = require('path');

require("./api/models/drone");
require("./api/models/feature");
require("./api/models/user");
require("./api/models/story");


// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/ck_dev_2", {
//   useNewUrlParser: true
// });

mongoose.connect('mongodb://dream_drone_user:canonkissX4@ds263638.mlab.com:63638/dream_drone_prod',{ useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb://cknew:canonkissX4@ds131109.mlab.com:31109/cknew',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});




routes = require("./api/routes/DroneRoutes"); //importing route
routes(app);
routes = require("./api/routes/FeatureRoutes"); //importing route
routes(app);
routes = require("./api/routes/StoryRoutes"); //importing route
routes(app);
routes = require("./api/routes/UserRoutes"); //importing route
routes(app);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
let server = app.listen(port);

console.log(" RESTful API server started on: " + port);
