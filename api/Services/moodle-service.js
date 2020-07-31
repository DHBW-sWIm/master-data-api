const mariadb = require('mariadb');
const axios = require('axios');

// =============================================================================

exports.get_mdl_log = async function get_mdl_log(checkPoint) {
     var datareturend = "Empty";
     var data = '<?xml version="1.0" encoding="iso-8859-1"?>\n<methodCall>\n<methodName>get_moodle_logfile</methodName>\n<params>\n <param>\n  <value>\n   <string>'+checkPoint+'</string>\n  </value>\n </param>\n</params>\n</methodCall>';
 
     var config = {
         method: 'post',
         url: 'http://localhost/moodle/webservice/xmlrpc/server.php?wstoken=3cd7601199d738ea3f642bc24741b4fe',
         headers: { 
           'Content-Type': 'text/plain'
         },
         data : data
       };
 
       await  axios(config) 
 .then(function (response) {
   datareturend = response.data;
   
 })
 .catch(function (error) {
   console.log(error);
   datareturend = error;
 
 });
     return datareturend;
 };

// =============================================================================

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

// =============================================================================

exports.insertCompany = async function(para){
     return await new Promise(async function(resolve, reject) {
     var company_name = para[0];
     var classification = para[1];

     var data = '<?xml version="1.0" encoding="iso-8859-1"?>\n<methodCall>\n<methodName>inser_new_company</methodName>\n<params>\n <param>\n  <value>\n   <string>'+ company_name +'</string>\n  </value>\n </param>\n</params>\n</methodCall>';

     var config = {
     method: 'post',
     url: 'http://localhost/moodle/webservice/xmlrpc/server.php?wstoken=3cd7601199d738ea3f642bc24741b4fe',
     headers: { 'Content-Type': 'text/plain'  },
     data : data
     };

    await axios(config)
    .then(function (response) {
      resolve("Updated Moodle");
    })
    .catch(function (error) {
      console.log(error);
    });
   });
}

// =============================================================================

exports.insertCompanyRepresentative = async function(para){
     return await new Promise(async function(resolve, reject) {
     var first_name = para[0];
     var last_name = para[1];
     var email = para[2];
     var phone = para[3];
     var company_id = para[4];
     var data = '<?xml version="1.0" encoding="iso-8859-1"?>\n<methodCall>\n<methodName>insert_new_company_rep</methodName>\n<params>\n <param>\n  <value>\n   <string>'+ first_name +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>'+ last_name +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>'+ email +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>'+ phone +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>'+ company_id +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>0</string>\n  </value>\n </param>\n</params>\n</methodCall>';

var config = {
  method: 'post',
  url: 'http://localhost/moodle/webservice/xmlrpc/server.php?wstoken=3cd7601199d738ea3f642bc24741b4fe',
  headers: { 
    'Content-Type': 'text/plain'
  },
  data : data
};

// =============================================================================

await axios(config)
.then(function (response) {
      resolve("Updated Moodle");
    })
    .catch(function (error) {
      console.log(error);
    });
   })
}

// =============================================================================

exports.updateCompany = async function(data){
     return await new Promise(async function(resolve, reject) {
     // ------------------------------------------------ //
    // ONLY FOR ASYNC TESTING
    setTimeout(function() {
     resolve("Updated Moodle"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
   }, 1000);
   // ------------------------------------------------ //
   })
}

exports.updateCompanyRepresentative = async function(para){
     return await new Promise(async function(resolve, reject) {

     var old_first_name = para[0];
     var old_last_name = para[1];
     var old_email = para[2];
     var old_phone = para[3];
     var old_company_id = para[4];
     var new_first_name = para[5];
     var new_last_name = para[6];
     var new_email = para[7];
     var new_phone = para[8];
     var new_company_id = para[9];

     // ------------------------------------------------ //
    // ONLY FOR ASYNC TESTING
    setTimeout(function() {
     resolve("Updated Moodle"); // After 1 seconds, resolve the promise with value "Updated Vtiger"
    }, 1000);
   // ------------------------------------------------ //
   })
}

// =============================================================================

exports.deleteCompany = async function(para){
     return await new Promise(async function(resolve, reject) {
     var company_name = para[0];
  
var data = '<?xml version="1.0" encoding="iso-8859-1"?>\n<methodCall>\n<methodName>delete_company</methodName>\n<params>\n <param>\n  <value>\n   <string>1</string>\n  </value>\n </param>\n <param>\n  <value>\n   <string>'+company_name+'</string>\n  </value>\n </param>\n <param>\n  <value>\n   <string>A</string>\n  </value>\n </param>\n</params>\n</methodCall>';

var config = {
     method: 'post',
     url: 'http://localhost/moodle/webservice/xmlrpc/server.php?wstoken=3cd7601199d738ea3f642bc24741b4fe',
     headers: { 
       'Content-Type': 'text/plain'
     },
     data : data
   };
   
   await axios(config)
   .then(function (response) {
     console.log(JSON.stringify(response.data));
     resolve("Updated Moodle");
   })
   .catch(function (error) {
     console.log(error);
   });
   })
}

// =============================================================================

exports.deleteCompanyRepresentative = async function(para){
     return await new Promise(async function(resolve, reject) {
     var first_name = para[0];
     var last_name = para[1];
     var email = para[2];
     var phone = para[3];
     var company_id = para[4];

     var data = '<?xml version="1.0" encoding="iso-8859-1"?>\n<methodCall>\n<methodName>delete_company_rep</methodName>\n<params>\n <param>\n  <value>\n   <string>'+ first_name +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>'+ last_name +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>'+ email +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>'+ phone +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>'+ company_id +'</string>\n  </value>\n </param>\n  <param>\n  <value>\n   <string>0</string>\n  </value>\n </param>\n</params>\n</methodCall>';
     
     var config = {
          method: 'post',
          url: 'http://localhost/moodle/webservice/xmlrpc/server.php?wstoken=3cd7601199d738ea3f642bc24741b4fe',
          headers: { 
            'Content-Type': 'text/plain'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          resolve("Updated Moodle");
        })
        .catch(function (error) {
          console.log(error);
        });
 })
}

// =============================================================================
