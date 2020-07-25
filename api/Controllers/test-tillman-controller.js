

exports.test = function(req, res) {

    data = "testdata";
    
    DBService.testTillman(data, function(err, res) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log("transaction-controller createTransaction sending Response... (t) ");
          res.status(201).json({
            message: "Transaction successfully created!"
          });
        }
    });
}