var fetch = require('node-fetch')

function fetchNews(url){
    return fetch(url)
            .then(res => res.json())
            .then(data =>{return data})
            .catch(err => {
            return {status: "Failed", error: err}
            })
  }
  
  module.exports = fetchNews;