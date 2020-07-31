// Base Setup
// =============================================================================
// call the packages we need
const express = require("express");
const router = express.Router();

// define middlewares
const auth = require("./middleware/authentication");
// =============================================================================

// define the modules we need
// =============================================================================
const testUserController = require("./Controllers/test-controller");
const testmdl = require("./Controllers/moodle-controller");
const testVtiger = require("./Controllers/vtiger-controller");
const camundaController = require("./Controllers/camunda-controller");
const vtigerController = require("./Controllers/vTiger-connection-controller");
// =============================================================================

// =============================================================================
// In the following section all routes have to be registered with method and path.
// Also all the routes should just handle access to the controller, no parsing or answering logic.
// router.get("/#path#", auth); // authentication can simply be added by adding this line with the correct path in front of the real route
// =============================================================================
// test route to make sure everything is working (accessed at GET http://localhost:8080/api/test)
router.get('/test', function (req, res) {
    testUserController.testFunction(req, res);
});

router.get('/mdl', function (req, res) {
    testmdl.test(req, res)
});

router.get('/vtiger', function (req, res) {
    testVtiger.test(req, res)
});

router.get('/vtigerController', function (req, res) {
    vtigerController.vtigerController(req, res)
});

router.all('/camunda/*', function (req, res) {
    camundaController.test(req)
        .then(r => res.send(r));
});

// =============================================================================
//EXPORT MODULE
module.exports = router;