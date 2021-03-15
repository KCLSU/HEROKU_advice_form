var fetch = require('node-fetch');

function preventDuplicates(id){

    let log_url = `https://kclsu-advice.firebaseio.com/submissions.json?orderBy="date"&limitToLast=1`;
    const today = new Date();
    const maxPeriod = 10;
    
    return fetch(log_url)
            .then(res=> res.json())
            .then(res => {
                let duplicateFound = false;
                //retrieve last submitted entry from firebase
                let lastDate;
                for (key in res){
                    lastDate = res[key].date
                };
                const lastSubmission = new Date(lastDate);
                if ((today.getTime() - lastSubmission.getTime())/1000 <= maxPeriod){
                    duplicateFound = true;
                }

                return duplicateFound;
                // console.log((new Date(res.date).getTime()) / 1000)
            })
  }
  
  module.exports = preventDuplicates;
