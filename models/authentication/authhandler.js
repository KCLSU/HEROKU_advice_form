require('dotenv').config();
const { ANONYMOUS_SIGNIN, FIREBASE_URI, FIREBASE_SIGNIN } = require('../../utils/stringVals')
var { fetch } = require('../../utils/fetch');



class authHandler {

    static getDatabaseEndpoint(area){
        return FIREBASE_URI + this.getDatabaseKey(area);
    }

    static getFirebaseToken(){
      return  fetch(ANONYMOUS_SIGNIN, { returnSecureToken: true }, 'POST')
    }

    static getFirebaseTokenSigned(email, password){
      const user = { email, password, returnSecureToken: true };
      return fetch(FIREBASE_SIGNIN, user, 'POST')
    }

    //LEGACY CODE
    static getDatabaseKey(area){
      let key;
      switch(area){
          case 'varsity' :
            key = process.env.FIREBASE_VARSITY_KEY;
            break;
          case 'projectx' :
            key = process.env.FIREBASE_PROJECTX_KEY;
            break;
          case 'elections-candidates' :
            key = process.env.FIREBASE_ELECTIONS_CANDIDATES_KEY;
            break;
          case 'elections-results' :
            key = process.env.FIREBASE_ELECTIONS_RESULTS_KEY;
            break;
          default: key = null;
        }
      return key;
  }
}

module.exports = authHandler;