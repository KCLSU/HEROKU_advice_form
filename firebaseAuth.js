var fetch = require('node-fetch')
var token;
require('dotenv').config();

function firebaseAuth(str){

  token = process.env.FIREBASE_VARSITY_KEY;

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
