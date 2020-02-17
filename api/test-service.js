// needs to be implemented as next
const mariadb = require('mariadb/callback');

exports.test = function(req, res) {
    //res.status(200).json({ message: 'hooray! welcome to our api! it works' });

    const conn = mariadb.createConnection({
        host: 'adminer.md.swimdhbw.de', 
        user:'bn_moodle',
        password: 'swim-access',
        database: 'bitnami_moodle'
    });

    conn.connect(err => {
        if (err) {
            console.log("not connected due to error: " + err);
        } else {
            console.log("connected ! connection id is " + conn.threadId);
        }
    });
}