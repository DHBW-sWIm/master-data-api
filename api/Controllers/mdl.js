
fs = require('fs');
var parser = require('xml2json');
const integrationController = require("../Controllers/integration-controller");
const mdlController = require("../Services/moodle-service");

exports.test = async function(req, res) {

    
  console.log("Integration mechanism moodle start!");
  try {
      // Get current Checkpoint as a parameter
      var checkPoint =  await integrationController.getCurrentMoodleCheckpoint();
      console.log("Current MoodleLog Checkpoint " + checkPoint);

      // Get the XML-Logfile from moodle service
      //var data = callToWebservice(checkPoint);
      var data = await  mdlController.get_mdl_log(checkPoint);
      //fs.readFile( './testFromMoodle.xml', async function(err, data) {

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
                  if (command[22] == "U"){
                      console.log("syncToVTiger Start");
                      console.log("Call Vtiger API to update Company Classification ");
                      console.log("syncToVTiger End");
                       //integrationController.syncToVTiger(command);
                  } else{
                      if (command[0] == "C"){
                          console.log("Check Point");
                           //integrationController.updateMoodleLog(command);
                      } else {
                          console.log("Omittable");
                      }
                  }
              } else {
                  console.log("Omittable")
              }
          }
          
          // ### if no error occured, mark the updates as done? ###
          console.log("Integration mechanism moodle end!");
          integrationController.updateMoodleLog(checkPoint);
       //});
  } catch (error) {
      console.log("Integration mechanism moodle Fail! " + error);
  }
}