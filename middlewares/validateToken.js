
exports.validateToken = (req, res, next) => {
    const existingTokens = req.serverTokens;
    const userToken = req.get('kclsutoken');
    const userIp = req.ip;
    console.log({userToken, existingTokens, userIp})

    //CHECK TOKEN IS IN LIST OF RECENTLY CREATED TOKENS
    //CHECK USER IP MATCHES IP IN TOKEN

    let validToken = existingTokens.find(item => 
       item.ip === userIp && item.token === userToken
    );

    req.validToken = validToken;

    next();
}

