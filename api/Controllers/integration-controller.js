const fs = require('fs');
const byline = require('byline');

exports.syncToVTiger = async function(commandString) {
    return await new Promise(function(resolve, reject) {
      console.log("syncToVTiger Start");
      console.log(commandString);
      var re = new RegExp('([0-9]+)');
      var id  = commandString.match(re)[0];
      console.log(id); // company id
      re = new RegExp('"([AB])"');
      var classification  = commandString.match(re)[0];
      console.log(classification); //classification
      // ------------------------------------------------ //
      // ONLY FOR ASYNC TESTING
      setTimeout(function() {
        resolve("Updated Vtiger"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
      }, 1000);
      // ------------------------------------------------ //

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
    })
}

exports.updateMoodleLog = async function(command){
  try{
    return await new Promise(function(resolve, reject) {
      console.log("updateMoodleLog Start");
      console.log(command);
        var re = new RegExp('([0-9]+)');
        var checkPoint  = command.match(re)[0];
        console.log(checkPoint); // new checkpoint
        fs.writeFileSync('./Log/moodleLog', '' + checkPoint);
        resolve("Updated MoodleLog");
      console.log("updateMoodleLog End");
    });
} catch (error){
  console.log(error);
  console.log("updateMoodleLog End");
  return null;
}
}

exports.getCurrentMoodleCheckpoint = async function(){
  console.log("getCurrentMoodleCheckpoint Start");
  try{
    return await new Promise(function(resolve, reject) {
      var stream = fs.createReadStream('./Log/moodleLog');
      stream = byline.createStream(stream);

      stream.on('data', function(line) {
        resolve("" + line);
      });
    });;
  } catch (error){
    console.log(error);
    console.log("getCurrentMoodleCheckpoint End");
    return null;
  }
}