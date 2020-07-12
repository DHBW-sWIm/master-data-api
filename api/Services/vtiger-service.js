const mariadb = require('mariadb');

/* const pool = mariadb.createPool({
     host: "127.0.0.1:3306",
     user: "root", 
     password: "vtiger",
     connectionLimit: 5,
     acquireTimeout: 10000
}); */

exports.testTillman = function(data, callback) {

     console.log("MoodleService testTillman called");
     pool.getConnection()
     .then(conn => {
      console.log("connected ! connection id is " + conn.threadId);
      conn.release(); //release the pool
     })
     .catch(err => {
      console.log("not connected due to error: " + err);
     });
}