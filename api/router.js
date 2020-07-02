// call the packages we need
const express = require("express");
const router = express.Router();

// define the modules we need
const testUserController = require("./test-user-controller");
const testAlexController = require("./Controllers/test");
const testTillmanController = require("./Controllers/test-tillman-controller");
const testPhilippController = require("./Controllers/test-philipp-controller");

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/test)
router.get('/test', function (req, res) {
    console.log("ROUTER GET /test");
    testUserController.testFunction(req, res);
});

router.get('/testAlex', function (req, res) {
    console.log("ROUTER GET /testAlex");
    testAlexController.test(req, res);
});

router.get('/testTillman', function (req, res) {
    console.log('ROUTER GET /testTillman');
    testTillmanController.test(req, res)
});

router.all('/camunda/*', function (req, res) {
    testPhilippController.test(req)
        .then(r => res.send(r));
});

//EXPORT MODULE
module.exports = router;