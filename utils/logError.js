var fetch = require('node-fetch');
//switch to axios

//GET URL FOR ERROR LOG FIREBASE

exports.logError = (err, message, extraInfo = {}) => {
    
    const errorMsg = {...err, message, ...extraInfo};
    console.log(' ---- logError ---- error message ')
    console.log(errorMsg);

    fetch(log_url, {
        method: 'POST',
        body: JSON.stringify(errorMsg)
    })
}

