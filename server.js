// =============================================================
// Dependencies
// 
var express = require("express");
var path = require("path");

// Sets up the Express App and Port listener
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =============================================================
// ROUTER
// The below points our server to our route files.
// These routes tell our server what to do when users visit or request data from various URLs.
// =============================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// =============================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
