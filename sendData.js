var fetch = require('node-fetch')
var url = 'http://localhost:2000/server'



function sendData(str){

  console.log("Received string")
  console.log(str)
  let postData = {};
      postData.method = 'POST';
      postData.body = JSON.stringify(str);
      postData.headers = {
      'Content-Type': 'application/json'
    }

  console.log("Stringified string")
  console.log(postData.body)
  console.log(typeof postData.body)

  return fetch(url, postData)
            .then(response => {
              console.log("Send Data")
               console.log(response.json())
              console.log(response.ok)
              return "Submitted";
            })
            .catch(err => {
              console.log(err)
              return "Failed"
            })
}

module.exports = sendData;
