var cloudinary = require('cloudinary').v2;
var presets = require('../../cloudinary/presets.js');
require('dotenv').config();

cloudinary.config({ 
  cloud_name: 'kclsu-media', 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});


  function cloudinaryUpload(data){
    let promise =  new Promise(resolve => {
      const name = data.originalname;
      let result = cloudinary.uploader.upload(
          data.path, 
          {  
            folder: "website_uploads/", 
            public_id: name.replace(/\..*/, ''),
            resource_type: 'auto',
            allowed_formats: ['png', 'jpg', 'pdf', 'doc', 'docx', 'csv', 'xlsx', 'pptx'],
            raw_convert: 'aspose'
          }, 
          (error, result) => { 
              if (error) console.log('Error: ', error)
              return result
      });
      resolve(result)
    })
    return promise;
      
  }

  function manipulateImage(public_id, data){
      let preset = !data.preset? {} : presets[data.preset];
      if (data.edit) preset = editPreset(preset, data.edit);
      let promise =  new Promise(resolve => {
          let transform = cloudinary.url(public_id, { transformation: preset});
          resolve(transform)
      })
        return promise;
  }

  function editPreset(pres, adjust){
    let preset = {...pres}
    if (adjust.direction) preset.gravity = adjust.direction;
    if (adjust.width) preset.width = adjust.width;
    if (adjust.height) preset.height = adjust.height;
    return preset;
  }

  module.exports = {
    cloudinaryUpload: cloudinaryUpload,
    manipulateImage: manipulateImage
  };
