// var { fetch } = require('./fetch');
// var { LOG_URL } = require('./stringVals');
var parser = require('ua-parser-js');
// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to the database
// var db = admin.database();
// var errorsRef = db.ref("errors");


//GET URL FOR ERROR LOG FIREBASE

exports.logError = (area, message, request, data = {}) => {

    var ua = parser(request.headers['user-agent']);
    const userAgent =  {
        browser: ua.browser.name || '',
        browserversion: ua.browser.version || '',
        device: ua.device.type || '',
        deviceVendor: ua.device.vendor || '',
        ua: ua.ua
    };
    
    const errorMsg = {
        area,
        date: new Date(),
        ...userAgent,
        message,
        ...data,
        ip: request.ip,
        referer: request.get('Referer'),
        route: request.route.path,
        method: request.method,
        origin: request.get('Origin')
    };

    // errorsRef.push(errorMsg);

    // return fetch(LOG_URL, errorMsg, 'POST');
}

