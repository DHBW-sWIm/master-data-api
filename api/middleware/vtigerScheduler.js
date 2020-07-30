fs = require('fs');
var parser = require('xml2json');
const integrationController = require("../Controllers/integration-controller");

module.exports = async() => {
    console.log("Integration mechanism vtiger start!");
    try {
        // Get current Checkpoint as a parameter
        var checkPoint = await integrationController.getCurrentVtigerCheckpoint();
        //console.log("Current VtigerLog Checkpoint " + checkPoint);

        // Get the XML-Logfile from vtigerService service
        //var data = callToWebservice(checkPoint);
        fs.readFile( './testFromVTiger.xml', async function(err, data) {

            var jsonString = parser.toJson(data);
            // Parse it into entries into an array
            var jsonObject = JSON.parse(jsonString);
            var entryArray = jsonObject.methodResponse.params.param.value.array;

            // Loop over every entry, convert the JSOn to a normal array // necessary because of promises, since they only work in "for int" loops
            var listOfCommands = [];
            for (i in entryArray.data.value){
                //console.log("Loop " + i)
                var command = entryArray.data.value[i];
                //console.log(command);
                //console.log(command.string);
                listOfCommands.push(command.string);
            }

            // Loop over every command and send the call // the order is important, because of checkpoints, so we need to use await
            for (var i = 0; i < listOfCommands.length; i++){
                command = "" + listOfCommands[i];
                if (command != null && command != undefined){
                    // console.log(command);
                    if (command[0] == "U" || command[0] == "I" || command[0] == "D"){
                        await integrationController.syncToMoodle(command);
                    } else{
                        if (command[0] == "C"){
                            await integrationController.updateVtigerLog(command);
                        } else {
                            console.log("Omittable");
                        }
                    }
                } else {
                    console.log("Omittable")
                }
            }
            
            // ### if no error occured, mark the updates as done? ###
            console.log("Integration mechanism vtiger end!");
         });
    } catch (error) {
        console.log("Integration mechanism vtiger Fail! " + error);
    }
}