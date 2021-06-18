var admin = require("firebase-admin");
var configs = require('../../utils/configs');
var { fetch } = require('../../utils/fetch');
var { ADVICE_PRO_URL, DEVELOPMENT_MODE } = require('../../utils/stringVals');


class AdviceproSubmission {

    constructor(data){
      this.data = data;
      this.date = new Date();
      this.lastName = data.Surname;
      this.response = {};
      this.submissionId = null;
    }

    //SUBMIT TO THE ADVICE PRO API
    submit(){
        const adviceproConfig = configs.advicepro();
        const packagedData = { ...this.data, ...adviceproConfig };
        // FOR DEVELOPMENT ENVIRONMENT ONLY
        if (DEVELOPMENT_MODE){
          console.log('Submitting to advicepro testing db')
          return new Promise(resolve => {
            var db = admin.database();
            var submissions = db.ref("advice/advicepro");
            try {
              const newSubmission = submissions.push(this.createResponse(true, 'Form successfully submitted'));
              resolve(newSubmission)
            } catch {
              const message = result.Message || `Advice Pro Response contained no message.`
              this.createResponse(false, message)
              throw new Error(message);
            }
          })
        } //FOR PRODUCTION ENVIRONMENT
        else return fetch(ADVICE_PRO_URL, packagedData, 'POST', true)
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

    //CREATE A NEW DATABASE RECORD OF THIS ENTRY
    createRecord(){
      const logObject = {...this.response };
      var db = admin.database();
      var submissions = db.ref("advice/submissions");
      const newSubmission = submissions.push(logObject);
      this.submissionId = newSubmission.key;
      this.response.submissionId = newSubmission.key;
    }


    //CREATE THE RESPONSE AFTER SUBMITING TO THE ADIVCE PRO API
    createResponse(successful, message){
      const result = this.response;
      result.status = successful ? 'Submitted' : 'Failed';
      result.error = !successful;
      result.message = message;
      result.date = this.date.toString();
      result.timestamp = this.date.getTime();
      result.lastName = this.lastName;
      result.submissionId = this.submissionId;
      return result;
    }
}

module.exports = AdviceproSubmission;

