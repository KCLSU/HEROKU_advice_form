const requestContents = [];

exports.attachToRequest = (req, res, next) => {
        console.log(req)
        req.requestContents = requestContents;
        next();
 }

exports.checkDuplicates = (req, res, next) => {
    const newString = req.body.toString();
    const duplicateExists = requestContents.find(str => str === newString);
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