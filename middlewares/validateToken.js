
exports.validateToken = (req, res, next) => {
    const existingTokens = req.serverTokens;
    const userToken = authHandler.validateToken(req.get('Cookie'));
    const userIp = req.connection.remoteAddress;

    //CHECK TOKEN IS IN LIST OF RECENTLY CREATED TOKENS
    //CHECK USER IP MATCHES IP IN TOKEN

    let validToken = existingTokens.find(item => 
       item.ip === userIp && item.token === userToken
    );

    req.validToken = validToken;

    next();
}

