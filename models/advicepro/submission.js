var configs = require('../../utils/configs');
var { fetch } = require('../../utils/fetch');
var { ADVICE_PRO_URL, ADVICEPRO_RECORDS_DATABASE_URL } = require('../../utils/stringVals');




class AdviceproSubmission {

    constructor(id, data){
      this.id = id;
      this.data = data;
      this.response = {};
    }

    //SUBMIT TO THE ADVICE PR API
    submit(){
        const adviceproConfig = configs.advicepro;
        const packagedData = { ...this.data, ...adviceproConfig };
      
        return fetch(ADVICE_PRO_URL, packagedData, 'POST', true)//TESTING - SET TO TRUE
                  .then(result => {
                    //CHECK GOOGLE STATUS CODE
                    if (result.HttpStatusCode && +result.HttpStatusCode >=200 && +result.HttpStatusCode < 204){
                      this.createResponse(true, 'Form successfully submitted')
                    } else {
                        const message = result.Message || `Advice Pro Response contained no message.`
                        this.createResponse(false, message)
                        
                        throw new Error(message);
                    }
                  })
                  
    }

    //UPDATE THE DATABASE RECORD OF THIS ENTRY
    updateRecord(){
      const logObject = {...this.response };
      console.log('LOGOBJECT');
      console.log(logObject)
      const url = `${ADVICEPRO_RECORDS_DATABASE_URL}${this.id}.json`;
      return fetch(url, logObject, 'PATCH');
    }


    //CREATE THE RESPONSE AFTER SUBMITING TO THE ADIVCE PRO API
    createResponse(successful, message){
      const result = this.response;
      result.status = successful ? 'Submitted' : 'Failed';
      result.error = !successful;
      result.message = message;
      return result;
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