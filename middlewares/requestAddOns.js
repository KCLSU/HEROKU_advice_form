
const requestContents = [];
const requestIps = [];
const serverTokens = [];

exports.attachToRequest = (req, res, next) => {
        req.requestContents = requestContents;
        req.requestIps = requestIps;
        req.serverTokens = serverTokens;
        next();
 }

