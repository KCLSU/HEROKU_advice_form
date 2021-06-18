var AdviceProSubmission = require('../models/advicepro/submission');
var { logError } = require('../utils/logError');;

exports.submitToAdvicePro = async (req, res) => {
    const formData = req.body.advicepro;
    const submission = new AdviceProSubmission(formData);
    
    try {
        console.log('submitted to advice pro')
        await submission.submit(); // SUBMIT TO ADVICE PRO
        await submission.createRecord(); //UPDATE DATABASE RECORD OF SUBMISSION
        if (submission.response.status === 'Submitted'){
            res.status(200).send(submission.response);
        } else {
            console.log('Inside the if')
            res.status(400).send(submission.response);
        } 

    } catch(err) {
        console.log('Inside the catch')
        const msg = err.message ? err.message : 'Failed to submit to advicepro --- submitToAdvicePro --- catch block error';
        res.status(500).send(submission.createResponse(false, msg));
        
        //UPDATE DATABASE RECORD OF SUBMISSION
        submission.createRecord();

        //UPDATE DATABASE ERROR LOG
        //WE COULD STORE ENTIRE FORM SUBMISSION? 
        const storedData = {};
        if(submission.submissionId) storedData.adviceproSubmissionId = submission.submissionId;
        if(submission.lastName) storedData.lastname = submission.lastName;
        // storedData.email = formData.EmailAddress;
        logError('advice', msg, req, { storedData, error: err });
    }

}

