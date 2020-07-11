//const express = require("express");
//const testUserController = require("./test-service");

// calling function in testUser Controller to simulate cascading calls throught the API
exports.testFunction = function(req, res) {
    console.log("testFunction called")
    res.send("test successfull");
}   