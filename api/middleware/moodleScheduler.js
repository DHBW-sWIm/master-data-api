fs = require('fs');
var parser = require('xml2json');
const integrationController = require("../Controllers/integration-controller");

// =============================================================================

module.exports = async() => {
    try {
        // Get current Checkpoint as a parameter
        var checkPoint = await integrationController.getCurrentMoodleCheckpoint();

        // Get the XML-Logfile from moodle service
        var data =  await mdlController.get_mdl_log(checkPoint);

            var jsonString = parser.toJson(data);
            // Parse it into entries into an array
            var jsonObject = JSON.parse(jsonString);
            var entryArray = jsonObject.methodResponse.params.param.value.array;

            // Loop over every entry, convert the JSOn to a normal array // necessary because of promises, since they only work in "for int" loops
            var listOfCommands = [];
            for (i in entryArray.data.value){
                var command = entryArray.data.value[i];
                listOfCommands.push(command.string);
            }

            // Loop over every command and send the call // the order is important, because of checkpoints, so we need to use await
            for (var i = 0; i < listOfCommands.length; i++){
                command = "" + listOfCommands[i];
                if (command != null && command != undefined){
                    // console.log(command);
                    if (command[22] == "U"){
                         integrationController.syncToVTiger(command);
                    } else{
                        if (command[0] == "C"){
                             integrationController.updateMoodleLog(command);
                        } else {
                            // ignore data
                        }
                    }
                } else {
                    // ignore data
                }
            }
            
            // if no error occured, mark the updates as done
            integrationController.updateMoodleLog(checkPoint);
         //});
    } catch (error) {
        console.log(error);
    }
}

// =============================================================================