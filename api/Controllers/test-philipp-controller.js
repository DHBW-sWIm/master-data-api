const axios = require('axios');

exports.test = async function test(req) {

    const path = req.url.split("/");
    path.splice(0,2);
    if (path[0] === "getTasks") {
        const url = "https://camunda.md.swimdhbw.de/engine-rest/task";
        if (path[1] == null) {
            const response = await axios.get(url);
            return response.data;
        }
        else {
            const response = await axios.get(url
                + "?assignee="
                + path[1]);
            return response.data;
        }
    }
    else if (path[0] === "createUser") {
        const newUser =
            {
                "profile": {
                    "id": req.body.profile.id,
                    "firstName": req.body.profile.firstName,
                    "lastName": req.body.profile.lastName,
                    "email": req.body.profile.email
                },
                "credentials": {
                    "password": req.body.credentials.password
                }
            };
        const response = await axios.post('https://camunda.md.swimdhbw.de/engine-rest/user/create', newUser);
        return response.data;
    }
};