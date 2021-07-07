const { generateString } = require("../utils/randomString");
const { DEVELOPMENT_MODE, CLIENT_DEV_URI, HEROKU_URI } = require('../utils/stringVals');

exports.createToken = (req, res, next) => {
    const ip = req.ip;
    const newToken = {
        ip,
        token: generateString() + ip
    }
    req.serverTokens.push(newToken);
    if (req.serverTokens.length > 25){
      req.serverTokens.shift();
    }
    const cookieSettings = {
      maxAge: 90000
    }

    // const allowedOrigin = DEVELOPMENT_MODE ?  CLIENT_DEV_URI : HEROKU_URI;
    // res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (DEVELOPMENT_MODE){
      cookieSettings.secure = true;
    }

    res.cookie('kclsutoken', newToken, cookieSettings);
    res.status(200).send(newToken);
}
