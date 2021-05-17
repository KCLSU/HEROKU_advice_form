var cloudinary = require('cloudinary').v2;
const { cloudinaryConfig } = require('../../utils/configs');
var presets = require('./presets.js');
require('dotenv').config();

//SEND CLOUDINARY CONFIG
cloudinary.config(cloudinaryConfig);


class cloudinaryInterface {
    constructor(){
        cloudinaryInstance = cloudinary.config(cloudinaryConfig);
    }

    upload(data){
        let promise =  new Promise(resolve => {
            const name = data.originalname;
            let result = this.cloudinaryInstance.uploader.upload(
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

    transform(public_id, data){
        let preset = !data.preset? {} : presets[data.preset];
        if (data.edit) preset = this.editPreset(preset, data.edit);
        let promise =  new Promise(resolve => {
            let transform = this.cloudinaryInstance.url(public_id, { transformation: preset});
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