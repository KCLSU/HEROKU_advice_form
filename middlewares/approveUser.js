
exports.approveUser = (req, res, next) => {
    const userIp = req.ip;
    console.log('source url')
    console.log(req.referer);
    //Check if IP has had a token issued previously. If not, check referer and protocol
    //Could add an IP location based check here too
    let validIp = req.serverTokens.find(item => item.ip === userIp);
    let validUser = validIp || req.referer.contains('kclsu.org/admin') && req.secure
    req.validUser = validUser;
    next();

};
