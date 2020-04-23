var fetch = require('node-fetch')
var token;
require('dotenv').config();

function firebaseAuth(str, area){

  switch(area){
    case 'varsity' :
      token = process.env.FIREBASE_VARSITY_KEY;
      break;
    case 'projectx' :
      token = process.env.FIREBASE_PROJECTX_KEY;
      break;
    case 'elections-candidates' :
      token = process.env.FIREBASE_ELECTIONS_CANDIDATES_KEY;
      break;
    case 'elections-results' :
      token = process.env.FIREBASE_ELECTIONS_RESULTS_KEY;
      break;
    default: token = null;
  }

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + token;

  let postData = {};
      postData.method = 'POST';
      postData.body = JSON.stringify(str);
      postData.headers = {
      'Content-Type': 'application/json'
    }


  return fetch(url, postData)
            .then(response => {
              return response.json();
            })
            .catch(err => {
              return {status: "Failed", error: err}
            })
}

module.exports = firebaseAuth;
