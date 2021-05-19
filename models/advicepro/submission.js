var configs = require('../../utils/configs');
var { fetch } = require('../../utils/fetch');
var { ADVICE_PRO_URL, ADVICEPRO_RECORDS_DATABASE_URL } = require('../../utils/stringVals');


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
        const adviceproConfig = configs.advicepro;
        const packagedData = { ...this.data, ...adviceproConfig };
        return fetch(ADVICE_PRO_URL, packagedData, 'POST', true)
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
      const url = `${ADVICEPRO_RECORDS_DATABASE_URL}.json`;
      console.log('creating record')
      return fetch(url, logObject, 'POST')
              .then(data => {
                this.submissionId = data.name;
                this.response.submissionId = data.name;
              })
    }


    //CREATE THE RESPONSE AFTER SUBMITING TO THE ADIVCE PRO API
    createResponse(successful, message){
      const result = this.response;
      result.status = successful ? 'Submitted' : 'Failed';
      result.error = !successful;
      result.message = message;
      result.date = this.date;
      result.lastName = this.lastName;
      result.submissionId = this.submissionId;
      return result;
    }
}

module.exports = AdviceproSubmission;

