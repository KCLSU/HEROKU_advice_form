var nodeFetch = require('node-fetch');
var HttpsProxyAgent = require('https-proxy-agent');
var FIXIE_URL = require('./stringVals').FIXIE_URL;

exports.fetch = (endpoint, body, method = 'GET', useProxie = false, headers = {}) => {

    let postData = {};
    postData.method = method;
    postData.body = JSON.stringify(body);
    postData.headers = {
        ...headers,
        'Content-Type': 'application/json'
    };
    if (useProxie)
        postData.agent = new HttpsProxyAgent(FIXIE_URL);

    return nodeFetch(endpoint, postData)
            .then(response => {
                return response.json();
            })
}