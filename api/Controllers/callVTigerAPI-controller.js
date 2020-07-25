const https= require("https");

// get VTIGER URL from env variable, otherwise use the default value at localhost
_VTIGER_URL_ = process.env.VTIGER_URL + "vtigercrm/webservice.php" || "localhost/vtigercrm/webservice.php";

// get VTIGER username (admin for testing)
_VTIGER_USERNAME_ = process.env.VTIGER_USERNAME  || "admin";

// get accessKey for specified user (in this case admin)
_VTIGER_USER_ACCESSKEY_ = process.env.VTIGER_USER_ACCESSKEY || "I7f6HRz707Z6gaCy ";


exports.connectToVTigerAPI = function(req, res) {

    //https.get(_VTIGER_URL_ + "?operation=getchallenge&username=" + _VTIGER_USERNAME_) 
    res.send({message: "test worked"});    

}


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

