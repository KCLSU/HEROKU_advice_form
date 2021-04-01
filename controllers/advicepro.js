var AdviceProSubmission = require('../models/advicepro/submission');
var Entry = require('../models/advicepro/entry');
const { logError } = require('../utils/logError');;



exports.submitToAdvicePro = async (req, res) => {
    const entry = new Entry(req.body.submissionId, req.body.advicepro);
    const submission = new AdviceProSubmission(entry.package, entry.getUserAgent());
    try {

        await submission.submit();

        if (submission.response.status === 'Submitted'){
            res.status(200).send(submission.response);
        } else {
            res.status(400).send(submission.response);
        } 

        submission.updateRecord(entry.id);
        
    } catch(err) {
        res.status(500).send(submission.response);
        logError(err, '--- submitToAdvicePro --- catch block error', entry);
        submission.updateRecord(entry.id);
    }

}

