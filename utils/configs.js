var multer  = require('multer');
var stringVals = require('./stringVals');

exports.multer = () => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'images')
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname)
        }
      })
}

exports.cloudinaryConfig(() => {
    return { 
      cloud_name: 'kclsu-media', 
      api_key: process.env.CLOUDINARY_KEY, 
      api_secret: process.env.CLOUDINARY_SECRET
    }
});

exports.advicepro = () => {
    return {
      ContractKey: stringVals.ADVICE_PRO_CONTRACT,
      AgencyAPIKey: stringVals.ADVICE_PRO_API,
      SourceAgencyName: stringVals.AGENCY_NAME,
      SourceContactEmail: stringVals.CONTACT_EMAIL,
      SourcePhoneNumber: stringVals.PHONE_NUMBER,
      SourceUserFullName: stringVals.FULL_NAME
    }
}

