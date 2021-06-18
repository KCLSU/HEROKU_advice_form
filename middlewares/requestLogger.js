
//SET WITH NEW ENDPOINT

//THIS IS FOR KEEPING A LOG OF EVERY REQUEST MADE
//NOT CURRENTLY IN USE, ONLY ERRORS ARE LOGGED

const url= '';

exports.sendLog = (req, res, next) => {

    //CREATE A SEPARATE DATABASE AREA FOR DEBUGGING
    const request = { 
        ...req.body.id, 
        url: req.url
    };

    fetch(log_url, { method: 'POST', body: JSON.stringify(request)})
    next()
}





module.exports = Logger;