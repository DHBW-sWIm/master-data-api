const https         = require("https");
const http          = require("http");
const bodyParser    = require('body-parser');
const crypto        = require('crypto');

// get VTIGER URL from env variable, otherwise use the default value at localhost
_VTIGER_URL_ = process.env.VTIGER_URL  || "http://localhost/vtigercrm/";

//connect the url to with the VTigerCRM api endpoint
_VTIGER_API_ENDPOINT_ = _VTIGER_URL_ + "webservice.php";

// get VTIGER username (admin for testing)
_VTIGER_USERNAME_ = process.env.VTIGER_USERNAME  || "admin";

// get accessKey for specified user (in this case admin)
_VTIGER_USER_ACCESSKEY_ = process.env.VTIGER_USER_ACCESSKEY || "I7f6HRz707Z6gaCy";


exports.connectToVTigerAPI = function(req, res) {

        http.get(_VTIGER_API_ENDPOINT_ + "?operation=getchallenge&username=" + _VTIGER_USERNAME_, (res) => {
            let data  = "";
            let token = "";

                res.on('data', (body) => {
                data += body;
                data =  JSON.parse(data);
                console.log(data);
                token = JSON.stringify(data.result.token);
                console.log("Test" + token);
    

                //accessKeyHash = crypto.createHash('md5').update(accessKey).digest('hex')

                // console.log(accessKeyHash);
                JSON.stringify({
                    operation: "login",
                    username: "admin",
                    accessKey: "924850a694602c0e6c41f289625546cc"
                })           
            
        })
            
}