const { body } = require('express-validator');

exports.validate = () => {
  return [ 
    body("advicepro.Forename", "Enter a valid first name").notEmpty().isString().escape(),
    body('advicepro.Surname',  "Enter a valid surname").notEmpty().isString().escape(),
    body('advicepro.EmailAddress', 'Invalid email').exists().isEmail().normalizeEmail(),
    body('advicepro.Ethnicity', 'Technical error, please contact support').optional().isString().escape(),
    body('advicepro.Gender', 'Technical error, please contact support').optional().escape(),
    body('advicepro.HasDisability', 'Technical error, please contact support').optional().toBoolean(),
    body('advicepro.MobileTelephoneNumber').optional().isMobilePhone(),
    body('advicepro.Notes', 'Technical error, please contact support').notEmpty(),
    body('submissionId').isString()
    ]   
}