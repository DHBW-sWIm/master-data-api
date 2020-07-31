const fs = require('fs');
const byline = require('byline');
const moodleService = require("../Services/moodle-service");

// =============================================================================

exports.syncToVTiger = async function(commandString) {
    return await new Promise(function(resolve, reject) {
      var re = new RegExp('([0-9]+)');
      var id  = commandString.match(re)[0]; // company id
      re = new RegExp('"([AB])"');
      var classification  = commandString.match(re)[0]; //classification

      // ***** ENTER VTIGER-API-CALL WITH DATA HERE *****

      // ------------------------------------------------ //
      // ONLY FOR ASYNC TESTING
      setTimeout(function() {
        resolve("Updated Vtiger"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
      }, 1000);
      // ------------------------------------------------ //
    })
}

// =============================================================================

exports.updateMoodleLog = async function(cc){
  try{
    return await new Promise(function(resolve, reject) {
        var checkPoint  = parseInt(cc) + 1;
        fs.writeFileSync('./Log/moodleLog.txt', '' + checkPoint);
        resolve("Updated MoodleLog");
    });
  } catch (error){
    console.log(error);
    return null;
  }
}

// =============================================================================

exports.getCurrentMoodleCheckpoint = async function(){
  try{
    return await new Promise(function(resolve, reject) {
      var stream = fs.createReadStream('./Log/moodleLog.txt');
      stream = byline.createStream(stream);

      stream.on('data', function(line) {
        resolve("" + line);
      });
    });;
  } catch (error){
    console.log(error);
    return null;
  }
}
// =============================================================================

exports.getCurrentVtigerCheckpoint = async function(){
  try{
    return await new Promise(function(resolve, reject) {
      var stream = fs.createReadStream('./Log/vtigerLog.txt');
      stream = byline.createStream(stream);

      stream.on('data', function(line) {
        resolve("" + line);
      });
    });;
  } catch (error){
    console.log(error);
    return null;
  }
}

// =============================================================================

exports.updateVtigerLog = async function(command){
  try{
    return await new Promise(function(resolve, reject) {
        var re = new RegExp('([0-9]+)');
        var checkPoint  = command.match(re)[0];
        fs.writeFileSync('./Log/vtigerLog.txt', '' + checkPoint);
        resolve("Updated Vtiger Log");
    });
  } catch (error){
    console.log(error);
    return null;
  }
}

// =============================================================================

exports.syncToMoodle = async function(commandString){
  return await new Promise(async function(resolve, reject) {
    // Collect command and table from the sql-command
    var re = new RegExp('(INSERT)?(UPDATE)?(DELETE)?');
    var command  = commandString.match(re)[0];

    re = new RegExp('\\b(\\w*dg_company\\w*)\\b');
    var table  = commandString.match(re)[0];

    // for each usecase combination of table and command, execute different functionalities
    var data = [];
    if (command == "INSERT" && table == "dg_company") {
      re = new RegExp("VALUES (.*)");
      parts = ("" + commandString.match(re)[1]).split("'");

      data.push(parts[1]);
      data.push(parts[3]);

      moodleService.insertCompany(data);
      resolve();
    }

    if (command == "INSERT" && table == "dg_company_representative") {
      re = new RegExp("VALUES \\((.*)");
      parts = ("" + commandString.match(re)[1]).split(",");

      data.push(parts[0]);
      data.push(parts[1]);
      data.push(parts[2]);
      data.push(parts[3]);
      re = new RegExp("([0-9]*)");
      data.push(parts[4].match(re)[1]);

      await moodleService.insertCompanyRepresentative(data);
      resolve();
    }

    if (command == "UPDATE" && table == "dg_company") {
      await moodleService.updateCompany(data);
      resolve();
    }

    if (command == "UPDATE" && table == "dg_company_representative") {
      var splitCommandString = commandString.split("NEWVALUES");

      re = new RegExp("(\\(.*?\\))");
      var oldValues = splitCommandString[0].match(re)[0];
      var newValues = splitCommandString[1].match(re)[0];
      var splitOld = oldValues.split(",");
      var splitNew = newValues.split(",");

      data.push(splitOld[0].substring(1));
      data.push(splitOld[1]);
      data.push(splitOld[2]);
      data.push(splitOld[3]);
      re = new RegExp("([0-9]*)");
      data.push(splitOld[4].match(re)[1]);
      data.push(splitNew[0].substring(1));
      data.push(splitNew[1]);
      data.push(splitNew[2]);
      data.push(splitNew[3]);
      data.push(splitNew[4].match(re)[1]);

      await moodleService.updateCompanyRepresentative(data);
      resolve();
    }

    if (command == "DELETE" && table == "dg_company") {
      re = new RegExp("'(.*)'");
      data.push(commandString.match(re)[1]);
      await moodleService.deleteCompany(data);
      resolve();
    }

    if (command == "DELETE" && table == "dg_company_representative") {
      re = new RegExp("VALUES \\((.*)");
      parts = ("" + commandString.match(re)[1]).split(",");

      data.push(parts[0]);
      data.push(parts[1]);
      data.push(parts[2]);
      data.push(parts[3]);
      re = new RegExp("([0-9]*)");
      data.push(parts[4].match(re)[1]);

      await moodleService.deleteCompanyRepresentative(data);
      resolve();
    }

    reject("NOT A VALID COMMAND OR TABLE!")
  })
}

// =============================================================================
