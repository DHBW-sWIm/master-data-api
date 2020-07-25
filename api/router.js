// call the packages we need
const express = require("express");
const router = express.Router();

// define middlewares
const auth = require("./middleware/authentication");

// define the modules we need
const testUserController = require("./test-user-controller");
const testAlexController = require("./Controllers/test");
const testTillmanController = require("./Controllers/test-tillman-controller");
const testPhilippController = require("./Controllers/test-philipp-controller");
const connectToVTigerAPI = require("./Controllers/callVTigerAPI-controller");

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/test)
router.get('/test', function (req, res) {
    console.log("ROUTER GET /test");
    testUserController.testFunction(req, res);
});

//router.get("/testAlex", auth); // authentication can simply be added by adding this line with the correct path in front of the real route
router.get('/testAlex', function (req, res) {
    console.log("ROUTER GET /testAlex");
    testAlexController.test(req, res);
});

router.get('/testTillman', function (req, res) {
    console.log('ROUTER GET /testTillman');
    testTillmanController.test(req, res)
});

router.get('/connectToVTigerAPI', function (req, res) {
    console.log('ROUTER GET /connectToVTigerAPI');
    connectToVTigerAPI.connectToVTigerAPI(req, res)
});

router.all('/camunda/*', function (req, res) {
    testPhilippController.test(req)
        .then(r => res.send(r));
});

//EXPORT MODULE
module.exports = router;