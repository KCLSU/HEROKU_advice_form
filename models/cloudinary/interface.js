var cloudinary = require('cloudinary').v2;
const configs = require('../../utils/configs');
var presets = require('./presets.js');
cloudinary.config(configs.cloudinary());

class cloudinaryInterface {
 
    upload(data){
        let promise =  new Promise((resolve, reject) => {
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
                function(error, result){ 
                   if (error) {
                       reject(error)
                   }
                return result
            });
            resolve(result);

        })
        return promise;
    }

    transform(public_id, data){
        let preset = !data.preset? {} : presets[data.preset];
        if (data.edit) preset = this.editPreset(preset, data.edit);
        let promise =  new Promise(resolve => {
            let transform = cloudinary.url(public_id, { transformation: preset});
            resolve(transform)
        })
        return promise;
    }

    editPreset(chosenPreset, adjust){
        let preset = {...chosenPreset}
        if (adjust.direction) preset.gravity = adjust.direction;
        if (adjust.width) preset.width = adjust.width;
        if (adjust.height) preset.height = adjust.height;
        return preset;     
    }
}


module.exports = cloudinaryInterface;