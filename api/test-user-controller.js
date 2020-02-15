const express = require("express");

exports.testFunction = function(req, res) {
    res.status(200).json({ message: 'hooray! welcome to our api! it works' });
}