var { logError } = require('../utils/logError');

exports.checkDuplicates = (req, res, next) => {
    const newString = JSON.stringify(req.body.advicepro);
    
    const duplicateExists = req.requestContents.find(content => content.body === newString);
    const curDate = new Date();
    if (duplicateExists){
        //CHECK TO SEE IF DUPLICATE REQUEST WAS MADE WITHIN 10 SECONDS OF PREVIOUS REQUESR
        if ((curDate - duplicateExists.date) / 1000 < 10){
            console.log((curDate - duplicateExists.date) / 1000);
            duplicateExists.date = curDate;
            res.status(500).send('Error: a recent duplicate submission attempt was made. Wait 15 seconds before trying again.');
            logError('unknown', 'Duplicate submission found', req);
        }
        else {
            duplicateExists.date = curDate;
            next();
        } 
    }
    else {
        req.requestContents.push({
            body: newString,
            date: curDate
        });
        if (req.requestContents.length > 5){
            req.requestContents.shift();
        }
        console.log({noreqs: req.requestContents.length});
        next();
    } 
}