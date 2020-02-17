const DBService = require("../Services/moodle-service");

exports.test = function(req, res) {
    data = "test";
    DBService.testAlex(data, function(err, result) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log("transaction-controller createTransaction sending Response... ");
          res.status(201).json({
            message: "Transaction successfully created!"
          });
        }
    });
}