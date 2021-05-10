const { body } = require('express-validator');
var AdviceProSubmission = require('../models/advicepro/submission');
var { logError } = require('../utils/logError');;



exports.submitToAdvicePro = async (req, res) => {
    const formId = req.body.submissionId;
    const formData = req.body.advicepro;
    const submission = new AdviceProSubmission(formId, formData);
    try {

        await submission.submit();

        if (submission.response.status === 'Submitted'){
            res.status(200).send(submission.response);
        } else {
            res.status(400).send(submission.response);
        } 

        //UPDATE DATABASE RECORD OF SUBMISSION
        submission.updateRecord();
        
    } catch(err) {
        const msg = err.message? err.message : 'Failed to submit to advicepro --- submitToAdvicePro --- catch block error';
        res.status(500).send(submission.createResponse(false, msg));
        
        //UPDATE DATABASE RECORD OF SUBMISSION
        submission.updateRecord();

        //UPDATE DATABASE ERROR LOG
        //WE COULD STORE ENTIRE FORM SUBMISSION? 
        const storedData = {};
        storedData.formId = formId;
        storedData.lastname = formData.Surname;
        storedData.email = formData.EmailAddress;

        logError('advice', msg, req, storedData);
        
    }

}

