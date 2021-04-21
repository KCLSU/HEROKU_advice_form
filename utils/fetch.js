var fetch = require('node-fetch')

exports.fetch = (endpoint, body, method = 'GET', headers = {}) => {

    let postData = {};
    postData.method = method;
    postData.body = JSON.stringify(body);
    postData.headers = {
        ...headers,
        'Content-Type': 'application/json'
    }


    return fetch(endpoint, postData)
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return {status: "Failed", error: err}
            })
}