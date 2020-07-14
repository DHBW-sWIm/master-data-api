const DBService = require("../Services/vtiger-service");

exports.syncToVTiger = function(data) {
    console.log("syncToVTiger Start");
    console.log(data);
    // possibly some corrections on the data

    // Call of the vtiger service // here we need the correct DBFunction for the company table
    /*DBService.VTigerCompany(data, function(err) {
        if (err) {
            console.log("syncToVTiger error" + err);
          } else {
            console.log("syncToVTiger success");
          }
    });*/

    console.log("syncToVTiger End");
}