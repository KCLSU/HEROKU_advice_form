
//SET WITH NEW ENDPOINT
const url

exports.sendLog = (req, res, next) => {

    //CREATE A SEPARATE DATABASE AREA FOR DEBUGGING
    const request = {
        ...req.body.advicepro, 
        ...req.body.id, 
        url: req.url
    };

    fetch(log_url, { method: 'POST', body: JSON.stringify(request)})
    next()
}





module.exports = Logger;