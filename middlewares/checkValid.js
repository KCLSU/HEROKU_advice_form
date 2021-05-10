const { validationResult } = require('express-validator/check');
const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");

exports.checkValid = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors.array().reduce((acc, val) => acc.concat(val.param).concat(', '), '');
      res.status(422).send(errorResponse(`Error in form inputs - server validation: ${errorMessage}`, { invalids: errors.array() } ))
      logError('Server Validation', `Error in AdvicePro package: ${errorMessage}`, req);
      return;
    }
    else next();
}
