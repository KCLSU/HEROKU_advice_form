var fetch = require('node-fetch')
var url = 'http://localhost:2000/server'



function sendData(str){
  let postData = {};
      postData.method = 'POST';
      postData.body = JSON.stringify({str});
      postData.headers = {
      'Content-Type': 'application/json'
    }

  return fetch(url, postData)
            .then(response => response.json())
            .catch(err => console.log(err))
}

module.exports = sendData;
