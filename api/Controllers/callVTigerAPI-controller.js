// this code represents the general idea of calling the vtiger api and not a final version of the implementation

const http          = require("http");
const crypto        = require('crypto');
const axios         = require('axios')
const querystring    = require('querystring');
const fsLib         = require('fs')


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

                tokenString = JSON.stringify(data.result.token);
                token = tokenString.slice(1,tokenString.length-1);

                console.log("Token: " + token)

                authenticateToVTigerAPI(token);      
            
            })
            
        })
    }

    function authenticateToVTigerAPI(token) {
        
        const accessKey = token + _VTIGER_USER_ACCESSKEY_;

        accessKeyHash = crypto.createHash('md5').update(accessKey).digest('hex')
        
        console.log(accessKeyHash);

        axios
            .post('http://localhost/vtigercrm/webservice.php', querystring.stringify({
                operation: "login",
                username: _VTIGER_USERNAME_,
                accessKey: accessKeyHash
             }))
            .then(res => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res.data)
                sessionKey = res.data.result.sessionName;
                writeSessionKey(sessionKey);
                
            })
            .catch(error => {
                console.error(error)
            })
    }

    function writeSessionKey(sessionKey){

        const data = sessionKey;
        fsLib.writeFile('api/stateData/VTigerAPISessionName.txt', data, (error) => { 
      
            // In case of a error throw err exception. 
            if (error) throw err; 
        }) 
    }
