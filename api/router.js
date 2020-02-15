
// call the packages we need
var express = require("express");
var router = express.Router();

// define the modules we need
const testUserController = require("./test-user-controller");

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/test)
router.get('/test', function(req, res) {
    console.log("ROUTER GET /test");
    testUserController.testFunction(req, res);
});


//EXPORT MODULE
module.exports = router;