var stringVals = require('./stringVals');

exports.cloudinary = () => {
    return { 
      cloud_name: 'kclsu-media', 
      api_key: stringVals.CLOUDINARY_KEY, 
      api_secret: stringVals.CLOUDINARY_SECRET
    }
};

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

exports.firebaseServiceAccount = () => {
  return {
    "project_id": stringVals.FIREBASE_PROJECT_ID,
    "private_key": stringVals.FIREBASE_PRIVATE_KEY,
    "client_email": stringVals.FIREBASE_CLIENT_EMAIL,
  } 
}



