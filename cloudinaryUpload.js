var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'kclsu-media', 
    api_key: '148547584157183', 
    api_secret: '2LDCxvbrh_TCIS6xxPWhCBrVb4Q' 
  });

  function cloudinaryUpload(){
    //   console.log(cloudinary.config)
    //   return promise = new Promise((resolve, reject) => {
          return cloudinary.uploader.upload("https://www.kclsu.org/asset/Event/6013/event-artwork.jpg", (error, result) =>{ 
            console.log('Error? ', error)
            return result});
        //  resolve(uploaded);
        //   else reject('Did Not Upload')
    //   })
  }

  module.exports = cloudinaryUpload;
