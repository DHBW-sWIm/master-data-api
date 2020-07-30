const mariadb = require('mariadb');

/* const pool = mariadb.createPool({
     host: "adminer.md.swimdhbw.de",
     user: "bn_moodle", 
     password: "swim-access",
     database: "bitnami_moodle",
     connectionLimit: 5,
     acquireTimeout: 10000
});
 */
exports.testAlex = function(data, callback) {

     console.log("MoodleService testAlex called");
     pool.getConnection()
     .then(conn => {
      console.log("connected ! connection id is " + conn.threadId);
      conn.release(); //release the pool
     })
     .catch(err => {
      console.log("not connected due to error: " + err);
     });
}

exports.insertCompany = async function(data){
     return await new Promise(async function(resolve, reject) {
     console.log("MoodleService insertCompany called");
     console.log(data);
     var company_name = data[0];
     var classification = data[1];

     // ------------------------------------------------ //
    // ONLY FOR ASYNC TESTING
    setTimeout(function() {
     resolve("Updated Moodle"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
   }, 1000);
   // ------------------------------------------------ //
   })
}

exports.insertCompanyRepresentative = async function(data){
     return await new Promise(async function(resolve, reject) {
     console.log("MoodleService insertCompanyRepresentative called");
     console.log(data);
     var first_name = data[0];
     var last_name = data[1];
     var email = data[2];
     var phone = data[3];
     var company_id = data[4];

     // ------------------------------------------------ //
    // ONLY FOR ASYNC TESTING
    setTimeout(function() {
     resolve("Updated Moodle"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
   }, 1000);
   // ------------------------------------------------ //
   })
}

exports.updateCompany = async function(data){
     return await new Promise(async function(resolve, reject) {
     console.log("MoodleService updateCompany called");
     console.log(data);

     // ------------------------------------------------ //
    // ONLY FOR ASYNC TESTING
    setTimeout(function() {
     resolve("Updated Moodle"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
   }, 1000);
   // ------------------------------------------------ //
   })
}

exports.updateCompanyRepresentative = async function(data){
     return await new Promise(async function(resolve, reject) {
     console.log("MoodleService updateCompanyRepresentative called");
     console.log(data);
     var old_first_name = data[0];
     var old_last_name = data[1];
     var old_email = data[2];
     var old_phone = data[3];
     var old_company_id = data[4];
     var new_first_name = data[5];
     var new_last_name = data[6];
     var new_email = data[7];
     var new_phone = data[8];
     var new_company_id = data[9];
     // ------------------------------------------------ //
    // ONLY FOR ASYNC TESTING
    setTimeout(function() {
     resolve("Updated Moodle"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
   }, 1000);
   // ------------------------------------------------ //
   })
}

exports.deleteCompany = async function(data){
     return await new Promise(async function(resolve, reject) {
     console.log("MoodleService deleteCompany called");
     console.log(data);
     var company_name = data[0];

     // ------------------------------------------------ //
    // ONLY FOR ASYNC TESTING
    setTimeout(function() {
     resolve("Updated Moodle"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
   }, 1000);
   // ------------------------------------------------ //
   })
}

exports.deleteCompanyRepresentative = async function(data){
     return await new Promise(async function(resolve, reject) {
     console.log("MoodleService deleteCompanyRepresentative called");
     console.log(data);

     // ------------------------------------------------ //
    // ONLY FOR ASYNC TESTING
    setTimeout(function() {
     resolve("Updated Moodle"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
   }, 1000);
   // ------------------------------------------------ //
 })
}