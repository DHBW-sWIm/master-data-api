fs = require('fs');
var parser = require('xml2json');
const integrationController = require("../Controllers/integration-controller");

module.exports = () => {
    console.log("Integration mechanism start!");
    try {
        // Get the XML-Logfile from moodle service
        fs.readFile( './testFromVTiger.xml', function(err, data) {

            //console.log("data ->", data);
            //console.log("err ->", err);

            var jsonString = parser.toJson(data);

            // Parse it into entries into an array
            //console.log("to json ->", jsonString);
            var jsonObject = JSON.parse(jsonString);
            //console.log("test 1 ->", jsonObject.Document);
            var entryArray = jsonObject.Document.Entry;

            // Loop over every entry, send the respective call to the controller for companies
            for (i in entryArray){
                var data = [entryArray[i].Method,entryArray[i].CompanyName,entryArray[i].CompanyAddress,
                    entryArray[i].Studiengang,entryArray[i].RepresentativeID,entryArray[i].Industry,
                    entryArray[i].NumberOfEmployees,entryArray[i].Kammer,entryArray[i].IsStudyPlanFull,
                    entryArray[i].IsAlreadyPartner,entryArray[i].MonetaryContribution];
                integrationController.syncToVTiger(data);
            }
        
            // ### if no error occured, mark the updates as done? ###
         });
    } catch (error) {
        console.log("Integration mechanism Fail! " + error);
    }
    console.log("Integration mechanism end!");
}