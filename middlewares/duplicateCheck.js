const requestContents = [];

exports.attachToRequest = (req, res, next) => {
        req.requestContents = requestContents;
        next();
 }

exports.checkDuplicates = (req, res, next) => {
    const newString = req.body.toString();
    const duplicateExists = requestContents.includes(requestContents)
    if (duplicateExists){
        res.status(500).send();
        sendError({}, 'Duplicate submission found')
    }
    else {
        requestContents.push(newString);
        if (requestContents.length > 5){
            requestContents.unshift();
        }
        next();
    } 
}