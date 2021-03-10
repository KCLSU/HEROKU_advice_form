var fetch = require('node-fetch')
var url;
require('dotenv').config();
var HttpsProxyAgent = require('https-proxy-agent');

function submitAdvicePro(str){

  // str.ContractKey = process.env.ADVICE_PRO_CONTRACT;
  // str.AgencyAPIKey = process.env.ADVICE_PRO_API;
  // url = process.env.ADVICE_PRO_URL;
  console.log('------')
  console.log('data sent to function')
  console.log(str)
  console.log('------')

  let postData = {};
      postData.method = 'POST';
      postData.body = JSON.stringify(str);
      postData.headers = {
      'Content-Type': 'application/json'
    }

  // postData.agent = new HttpsProxyAgent(process.env.FIXIE_URL);

  return fetch(url, postData)
            .then(res => res.json())
            .then(res => {
              let responseObject = {};
              if (res.Messages && res.Messages[0] === 'Okay'){
                responseObject.status = 'Submitted';
                responseObject.messages = res.Messages;
              } else if (res.HttpStatusCode && +res.HttpStatusCode >200 && +res.HttpStatusCode < 204){
                responseObject.status = 'Submitted'
              } else if (res.Message){
                responseObject.status = 'Failed'
                responseObject.advicepromessage = res.Message;
              } else {
                responseObject.status = 'Failed'
                responseObject.advicepromessage = res;
              }
              return responseObject;
            })
            .catch(err => {
              return {status: "Failed", error: err}
            })
}

module.exports = submitAdvicePro;
