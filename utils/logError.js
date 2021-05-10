var {fetch } = require('./fetch');
var { LOG_URL } = require('./stringVals');
var parser = require('ua-parser-js');
//switch to axios

//GET URL FOR ERROR LOG FIREBASE

exports.logError = (area, message, request, data = {}) => {

    var ua = parser(request.headers['user-agent']);
    const userAgent =  {
        browser: ua.browser.name || '',
        browserversion: ua.browser.version || '',
        device: ua.device.type || '',
        deviceVendor: ua.device.vendor || '',
        ua: ua.ua,
        lastname: this.lastName 
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
        method: request.method
    };

    return fetch(LOG_URL, errorMsg, 'POST');
}

