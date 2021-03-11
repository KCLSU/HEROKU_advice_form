var fetch = require('node-fetch');

function preventDuplicates(id){

    let log_url = `https://kclsu-advice.firebaseio.com/submissions.json?orderBy="date"&limitToLast=1`;
    const today = new Date();
    
    return fetch(log_url)
            .then(res=> res.json())
            .then(res => {
                let duplicateFound = false;
                //retrieve last submitted entry from firebase
                let lastDate;
                for (key in res){
                    console.log(key)
                    lastDate = res[key].date
                };
                const lastSubmission = new Date(lastDate);
                console.log('lastsubmission')
                console.log(lastSubmission);
                console.log((today - lastSubmission)/1000);

                if ((today.getTime() - lastSubmission.getTime())*1000 <= 20){
                    duplicateFound = true;
                }
                
                return duplicateFound;
                // console.log((new Date(res.date).getTime()) / 1000)
            })
  }
  
  module.exports = preventDuplicates;

//   {
//     "rules": {
          
//       ".read": true,
//       ".write": true
//     }
//   }