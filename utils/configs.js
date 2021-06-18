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
  return JSON.stringify({
    type: "service_account",
    project_id: stringVals.FIREBASE_PROJECT_ID,
    private_key_id: stringVals.FIREBASE_PRIVATE_KEY_ID,
    private_key: stringVals.FIREBASE_PRIVATE_KEY,
    client_email: stringVals.FIREBASE_CLIENT_EMAIL,
    client_id: stringVals.FIREBASE_CLIENT_ID,
    auth_uri: stringVals.FIREBASE_AUTH_URI,
    token_uri: stringVals.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: stringVals.FIREBASE_AUTH_PROVIDER,
    client_x509_cert_url: stringVals.FIREBASE_CLIENT_X509_CERT_URL
  })
  
}

