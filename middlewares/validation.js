const { body } = require('express-validator');

exports.validate = (area) => {
  switch(area){
    case 'advicepro': {
      return [ 
        body("advicepro.Forename", "Enter a valid first name").notEmpty().isString().escape(),
        body('advicepro.Surname',  "Enter a valid surname").notEmpty().isString().escape(),
        body('advicepro.EmailAddress', 'Invalid email').notEmpty().isEmail(),
        body('advicepro.Ethnicity', 'The Ethnicity field is invalid. Technical error, please contact help@kclsu.org').optional().isString().escape(),
        body('advicepro.Gender', 'The Gender field is invalid. Technical error, please contact help@kclsu.org').optional().escape(),
        body('advicepro.HasDisability', 'The Disability input has an incorrect value. Technical error, please contact help@kclsu.org').optional().toBoolean(),
        body('advicepro.Notes', 'The Notes field is invalid. Technical error, please contact help@kclsu.org').notEmpty()
        ] 
    }
  }  
}