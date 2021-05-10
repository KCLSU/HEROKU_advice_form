var AdviceProSubmission = require('../models/advicepro/submission');
var { logError } = require('../utils/logError');;



exports.submitToAdvicePro = async (req, res) => {
    const formData = req.body.advicepro;
    const submission = new AdviceProSubmission(formData);
    
    try {

        await submission.submit(); // SUBMIT TO ADVICE PRO
        await submission.createRecord(); //UPDATE DATABASE RECORD OF SUBMISSION
        console.log({id: submission.submissionId})
        if (submission.response.status === 'Submitted'){
            res.status(200).send(submission.response);
        } else {
            res.status(400).send(submission.response);
        } 

        
    } catch(err) {
        const msg = err.message? err.message : 'Failed to submit to advicepro --- submitToAdvicePro --- catch block error';
        res.status(500).send(submission.createResponse(false, msg));
        
        //UPDATE DATABASE RECORD OF SUBMISSION
        await submission.createRecord();

        //UPDATE DATABASE ERROR LOG
        //WE COULD STORE ENTIRE FORM SUBMISSION? 
        const storedData = {};
        storedData.adviceproSubmissionId = submission.submissionId;
        storedData.lastname = submission.lastName;
        // storedData.email = formData.EmailAddress;
        logError('advice', msg, req, storedData);
        
    }

}

