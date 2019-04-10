var fetch = require('node-fetch')
var url;
var HttpsProxyAgent = require('https-proxy-agent');
require('dotenv').config();


function sendData(str){
  url = process.env.ADVICE_PRO_URL;
  str.ContractKey = process.env.ADVICE_PRO_CONTRACT;
  str.AgencyAPIKey = process.env.ADVICE_PRO_API;

  let postData = {};
      postData.method = 'POST';
      postData.agent = new HttpsProxyAgent(process.env.FIXIE_URL);
      postData.body = JSON.stringify(str);
      postData.headers = {
      'Content-Type': 'application/json'
    }

  return fetch(url, postData)
            .then(response => {
              return {status: "Submitted"};
            })
            .catch(err => {
              return {status: "Failed", error: err}
            })
}

module.exports = sendData;
