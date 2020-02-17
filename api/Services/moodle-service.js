const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: "adminer.md.swimdhbw.de",
     user: "bn_moodle", 
     password: "swim-access",
     database: "bitnami_moodle",
     connectionLimit: 5
});

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