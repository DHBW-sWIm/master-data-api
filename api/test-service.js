// needs to be implemented as next
const mariadb = require('mariadb/callback');

exports.test = function(req, res) {
    //res.status(200).json({ message: 'hooray! welcome to our api! it works' });

    // create a connection object with the nessecary data, to establish a connection to mariadb from moodle
    const conn = mariadb.createConnection({
        host: 'adminer.md.swimdhbw.de', 
        user:'bn_moodle',
        password: 'swim-access',
        database: 'bitnami_moodle'
    });

    // try to connect to the DB
    conn.connect(err => {
        if (err) {
            console.log("not connected due to error: " + err);
        } else {
            console.log("connected ! connection id is " + conn.threadId);
        }
    });
}