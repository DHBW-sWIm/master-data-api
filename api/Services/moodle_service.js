const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: 'adminer.md.swimdhbw.de',
     user:'bn_moodle', 
     password: 'swim-access',
     database: "bitnami_moodle",
     connectionLimit: 5
});

function createNewConnection(multiple) {
     var tempConnection = mariadb.createConnection({
       host: "adminer.md.swimdhbw.de",
       user: "bn_moodle",
       password: "swim-access",
       database: "bitnami_moodle",
       multipleStatements: multiple,
       connectionLimit: 5
     });
     return tempConnection;
}

exports.testAlex = function(data, callback) {

     console.log("MoodleService testAlex called");
     pool.getConnection()
     .then(conn => {
          console.log("test 1");
     conn.query("SELECT * FROM mdl_user;")
     .then((rows) => {
          console.log("test 2");
     console.log(rows); //[ {val: 1}, meta: ... ]
     //Table must have been created before 
     // " CREATE TABLE myTable (id int, val varchar(255)) "
     return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
     })
     .then((res) => {
          console.log("test 3");
     console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
     conn.end();
     })
     .catch(err => {
     //handle error
     console.log(err); 
     conn.end();
     })
        
}).catch(err => {
      //not connected
});
}