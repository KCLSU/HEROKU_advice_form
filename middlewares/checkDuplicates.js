var logError = require('./../utils/logError');

exports.checkDuplicates = (req, res, next) => {
    const newString = req.body.toString();
    const duplicateExists = req.requestContents.find(str => str === newString);
    if (duplicateExists){
        res.status(500).send('Error: Duplicate submission found');
        logError({}, 'Duplicate submission found')
    }
    else {
        req.requestContents.push(newString);
        if (req.requestContents.length > 5){
            req.requestContents.unshift();
        }
        next();
    } 
}