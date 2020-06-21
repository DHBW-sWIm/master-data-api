const axios = require('axios');

exports.test = async (req, res) => {

    const response = await axios.get('https://camunda.md.swimdhbw.de/engine-rest/task');
    return response.data;

};