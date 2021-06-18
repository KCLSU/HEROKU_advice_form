const { validationResult } = require('express-validator');
const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");

exports.checkValid = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors.array().reduce((acc, val) => acc.concat(val.param).concat(', '), '');
      const errorsArrayObject = { invalids: errors.array() };
      res.status(422).send(errorResponse(`Error in form inputs - server validation: ${errorMessage}`, errorsArrayObject ))
      logError('Server Validation', `Error in AdvicePro package: ${errorMessage}`, req);
      return;
    }
    else next();
}
