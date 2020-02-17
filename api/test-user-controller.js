//const express = require("express");
const testUserController = require("./test-service");

// calling function in testUser Controller to simulate cascading calls throught th API
exports.testFunction = function(req, res) {
    testUserController.test(req, res);
}