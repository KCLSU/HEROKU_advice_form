const { body } = require('express-validator');

exports.validate = () => {
  return [ 
    body("advicepro.Forename").notEmpty().isString().escape(),
    body('advicepro.Surname').notEmpty().isString().escape(),
    body('advicepro.EmailAddress', 'Invalid email').exists().isEmail().normalizeEmail(),
    body('advicepro.Ethnicity').optional().isString().escape(),
    body('advicepro.Gender').optional().escape(),
    body('advicepro.HasDisability').optional().toBoolean(),
    body('advicepro.MobileTelephoneNumber').optional().isMobilePhone(),
    body('advicepro.Notes').notEmpty(),
    body('submissionId').isString()
    ]   
}