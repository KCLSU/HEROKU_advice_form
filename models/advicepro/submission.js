var configs = require('../../utils/configs');
var fetch = require('node-fetch');
var HttpsProxyAgent = require('https-proxy-agent');
var FIXIE_URL = require('../../utils/stringVals').FIXIE_URL;
var ADVICE_PRO_URL = require('../../utils/stringVals').ADVICE_PRO_URL;

const { ADVICEPRO_RECORDS_DATABASE_URL } = require('../../utils/stringVals');
const { logError } = require('../../utils/logError');



class AdviceproSubmission {

    constructor(data, userAgent){
      this.data = data;
      this.userAgent = userAgent;
      this.response = {};
    }

    submit(){
        const adviceproConfig = configs.advicepro;
        const packagedData = {...this.data, ...adviceproConfig}
        let postData = {};
            postData.method = 'POST';
            postData.body = JSON.stringify(packagedData);
            postData.headers = {
            'Content-Type': 'application/json'
          }
      
        postData.agent = new HttpsProxyAgent(FIXIE_URL);
      
        return fetch(ADVICE_PRO_URL, postData)
                  .then(response => response.json())
                  .then(res => {
                    //CHECK GOOGLE STATUS CODE
                    if (res.HttpStatusCode && +res.HttpStatusCode >=200 && +res.HttpStatusCode < 204){
                      this.createResponse(true, 'Form successfully submitted')
                    } else {
                      const message = res.Message || 'Advice Pro Response contained no message'
                      this.createResponse(false, message )
                      logError({message}, this.userAgent);
                    }
                  })
                  
    }

    updateRecord(id){
      const logObject = this.createRecordObject();
      const url = `${ADVICEPRO_RECORDS_DATABASE_URL}${id}.json`;

      console.log(' ---- updateRecord ---- log object ')
      console.log(logObject);

      fetch(url, {method: 'PATCH', body: JSON.stringify(logObject)})
    }


    createRecordObject(){
      return {
        ...this.response, 
        ...this.userAgent
      }
    }

    createResponse(successful, message){
      const result = this.response;
      result.status = successful ? 'Submitted' : 'Failed';
      result.error = !successful;
      result.message = message;

      console.log(' ---- createResponse---- log object ')
      console.log(result);
    }
}

module.exports = AdviceproSubmission;

//LOG OBS




// let data = req.body.advicepro;
// let id = req.body.submissionId;
// let log_url = `${}${id}.json`;

// //get user agent details
// var ua = parser(req.headers['user-agent']);
// const user = {
//   browser: ua.browser.name || '',
//   browserversion: ua.browser.version || '',
//   device: ua.device.type || '',
//   deviceVendor: ua.device.vendor || '',
//   ua: ua.ua
// };
// //Attach last name to data
// user.lastname = data.Surname;
// const errors = validationResult(req);

// if (!errors.isEmpty()) {
//   const errorMessage = errors.array().reduce((acc, val) => acc.concat(val.param).concat(', '), '');
//   res.status(422).json({ error: true, message: `Error in form inputs - server validation: ${errorMessage}`, invalids: errors.array() });
//   fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: 'Failed', error: true, message: `Error in form inputs - server validation: ${errorMessage}`, ...user})})
//   return;
// }

  
//   submitAdvicePro(data))
//   .then(transfer => {
//       if (transfer.status === 'Submitted'){
//         res.status(200).send({status: transfer.status, error: false, "message": "Form successfully submitted"});
//         fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: transfer.status, error: false, message: 'Submitted To Advice Pro', ...user})})
//       }
//       else {
//         const message = "Form unsuccessfully submitted - error unknown";
//         res.status(400).send({"status": transfer.status, "error": true, transfer, "message": message});
//         fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: transfer.status, error: true, message, ...user})})
//       } 
//     })
//     .catch(err => {
//       res.status(500).send({error: true, "status": "Failed", message: err.message})
//       fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: 'Failed', error: true, message: err.message, 'user': '', ...user})})
//     })