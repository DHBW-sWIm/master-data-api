const axios = require('axios');

exports.test = async function test(req) {

    const path = req.url.split("/");
    path.splice(0, 2);
    if (path[0] === "getTasks") {
        const url = "https://camunda.md.swimdhbw.de/engine-rest/task";
        if (path[1] == null) {
            const response = await axios.get(url);
            return response.data;
        } else {
            const response = await axios.get(url
                + "?assignee="
                + path[1]);
            return response.data;
        }
    } else if (path[0] === "createUser") {
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
        const response = await axios.post("https://camunda.md.swimdhbw.de/engine-rest/user/create", newUser);
        return response.data;
    } else if (path[0] === "process-definition") {
        let url;

        if (path[1] === "key") {
            url = "https://camunda.md.swimdhbw.de/engine-rest"
                + "/process-definition/"
                + path[2]
                + "/start";
        } else {
            url = "https://camunda.md.swimdhbw.de/engine-rest"
                + "/process-definition/"
                + path[1]
                + "/start";
        }

        const data = {
            "variables": req.body.variables,
            "businessKey": req.body.businessKey,
            "caseInstanceId": req.body.caseInstanceId,
            "startInstructions": req.body.startInstructions,
            "skipCustomListeners": req.body.skipCustomListeners,
            "skipIoMappings": req.body.skipIoMappings,
            "withVariablesInReturn": req.body.withVariablesInReturn
        };
        const response = await axios.post(url, data);
        return response.data;
    }
};