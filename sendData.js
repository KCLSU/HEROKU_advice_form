var fetch = require('node-fetch')
var url;
require('dotenv').config();
var HttpsProxyAgent = require('https-proxy-agent');



function sendData(str){

  str.ContractKey = process.env.ADVICE_PRO_CONTRACT;
  str.AgencyAPIKey = process.env.ADVICE_PRO_API;
  url = process.env.ADVICE_PRO_URL;

  let postData = {};
      postData.method = 'POST';
      postData.body = JSON.stringify(str);
      postData.headers = {
      'Content-Type': 'application/json'
    }
    postData.agent = new HttpsProxyAgent(process.env.FIXIE_URL);

  return fetch(url, postData)
            .then(response => {
              return {status: "Submitted"};
            })
            .catch(err => {
              return {status: "Failed", error: err}
            })
}

module.exports = sendData;
