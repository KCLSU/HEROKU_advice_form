var stringVals = require('./stringVals');

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

