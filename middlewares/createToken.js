exports.createToken = (req, res, next) => {
    const ip = req.ip;
    const newToken = {
        ip,
        token: utils.createString() + ip
    }
    req.serverTokens.push(newToken);
    if (req.serverTokens.length > 25){
      req.serverTokens.shift();
    }
    res.setHeader('Set-Cookie', `kclsutoken=${newToken}; Secure`);
    res.status(200);
}
