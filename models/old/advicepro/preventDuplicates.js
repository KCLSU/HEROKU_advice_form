var fetch = require('node-fetch');

function preventDuplicates(id){

    let log_url = `https://kclsu-advice.firebaseio.com/submissions.json?orderBy="date"&limitToLast=2`;
    const today = new Date();
    const maxPeriod = 10;
    
    return fetch(log_url)
            .then(res=> res.json())
            .then(results => {

                let duplicateFound = false;
                //retrieve last submitted entry from firebase
                let lastDate;
                const ar = [];
                for (key in results){
                   ar.push(results[key])
                };
              
                lastDate = ar[0].date;
                console.log(lastDate)
                const lastSubmission = new Date(lastDate);
                if ((today.getTime() - lastSubmission.getTime())/1000 <= maxPeriod){
                    duplicateFound = true;
                }
               return duplicateFound;
            })
  }
  
  module.exports = preventDuplicates;
