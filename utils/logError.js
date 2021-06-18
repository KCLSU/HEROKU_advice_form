var parser = require('ua-parser-js');
// Import Admin SDK
var admin = require("firebase-admin");


exports.logError = (area, message, request, data = {}) => {
    const datetime = new Date();
    var ua = parser(request.headers['user-agent']);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const userAgent =  {
        browser: ua.browser.name || '',
        browserversion: ua.browser.version || '',
        device: ua.device.type || '',
        deviceVendor: ua.device.vendor || '',
        ua: ua.ua
    };
    
    const errorMsg = {
        area,
        ...userAgent,
        message,
        ...data,
        ip: request.ip || '',
        referer: request.get('Referer') || '',
        route: request.route.path || '',
        method: request.method || '',
        origin: request.get('Origin') || '',
        date: `${datetime.getFullYear()}, ${datetime.getDate()} ${months[datetime.getMonth()]} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`,
        timestamp: datetime.getTime()
    };

    var db = admin.database();
    var errorsRef = db.ref("errors");
    errorsRef.push(errorMsg);
}

