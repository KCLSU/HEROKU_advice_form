var AdviceProSubmission = require('../models/advicepro/submission');
var Entry = require('../models/advicepro/entry');



exports.submitToAdvicePro = async (req, res) => {
    const entry = new Entry(req.body.submissionId, req.body.advicepro);
    
    try {

        const submission = await new AdviceProSubmission(entry.package);

        if (submission.response.status === 'Submitted'){
            res.status(200).send(submission.response);
            submission.updateLog();
        } else {
            res.status(400).send(submission.response);
            submission.updateLog();
        } 
        
    } catch(err) {
        res.status(500).send(submission.response)
        fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: 'Failed', error: true, message: err.message, 'user': '', ...user})})
    }

}

