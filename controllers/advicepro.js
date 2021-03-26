

exports.submitToAdvicePro = (req, res) => {
    let data = req.body.advicepro;
    let id = req.body.submissionId;
    let log_url = `https://kclsu-advice.firebaseio.com/submissions/${id}.json`;
    
    //get user agent details
    var ua = parser(req.headers['user-agent']);
    const user = {
      browser: ua.browser.name || '',
      browserversion: ua.browser.version || '',
      device: ua.device.type || '',
      deviceVendor: ua.device.vendor || '',
      ua: ua.ua
    };
    //Attach last name to data
    user.lastname = data.Surname;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().reduce((acc, val) => acc.concat(val.param).concat(', '), '');
      res.status(422).json({ error: true, message: `Error in form inputs - server validation: ${errorMessage}`, invalids: errors.array() });
      fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: 'Failed', error: true, message: `Error in form inputs - server validation: ${errorMessage}`, ...user})})
      return;
    }
  
      preventDuplicates()
      .then(duplicateExists => {
        if(duplicateExists){
          throw new Error('Previous submission made within last 10 seconds. Try again later.');
        } 
      })
      .then( () => submitAdvicePro(data))
      .then(transfer => {
          if (transfer.status === 'Submitted'){
            res.status(200).send({status: transfer.status, error: false, "message": "Form successfully submitted"});
            fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: transfer.status, error: false, message: 'Submitted To Advice Pro', ...user})})
          }
          else {
            const message = "Form unsuccessfully submitted - error unknown";
            res.status(400).send({"status": transfer.status, "error": true, transfer, "message": message});
            fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: transfer.status, error: true, message, ...user})})
          } 
        })
        .catch(err => {
          res.status(500).send({error: true, "status": "Failed", message: err.message})
          fetch(log_url, {method: 'PATCH', body: JSON.stringify({status: 'Failed', error: true, message: err.message, 'user': '', ...user})})
        })

}