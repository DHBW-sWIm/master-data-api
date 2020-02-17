//const express = require("express");
const testUserController = require("./test-service");

exports.testFunction = function(req, res) {
    testUserController.test(req, res);
}