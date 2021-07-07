const { generateString } = require("../utils/randomString");
const { DEVELOPMENT_MODE, CLIENT_DEV_URI, KCLSU_URI } = require('../utils/stringVals');

exports.createToken = (req, res, next) => {
    const ip = req.ip;
    const newToken = {
        ip,
        token: generateString() + ip
    }
    req.serverTokens.push(newToken);
    if (req.serverTokens.length > 25){
      req.serverTokens.shift();
    };
    const cookieSettings = {
      maxAge: 90000,
      secure: true,
      httpOnly: false
    };

    const allowedOrigin = DEVELOPMENT_MODE ?  CLIENT_DEV_URI : KCLSU_URI;
    
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    res.cookie('kclsutoken', newToken, cookieSettings);
    res.status(200).send(newToken);
}
