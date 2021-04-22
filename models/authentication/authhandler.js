require('dotenv').config();
var FIREBASE_URI = require('../../utils/stringVals').FIREBASE_URI;
var fetch = require('../../utils/fetch');



class authHandler {

    static generateString(){
        return Math.random().toString(36).substr(2, 10);
    }

    static getDatabaseEndpoint(area){
        return FIREBASE_URI + this.getDatabaseKey(area);
    }

    static getFirebaseTokenWithArea(){
      
    }

    static getFirebaseTokenWithArea(area){

    }

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