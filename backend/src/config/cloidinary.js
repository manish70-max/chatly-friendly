import cloudinary from 'cloudinary'
import config from './config.js';
import fs from "fs";
const uploadCloudinary = async(filePath)=>{
   
     cloudinary.config({ 
        cloud_name:config.CLOUD_NAME, 
        api_key:config.API_KEY, 
        api_secret: config.API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    try{

         const uploadResult = await cloudinary.uploader.upload(filePath)
        
         fs.unlinkSync(filePath)
         return uploadResult.secure_url

    }catch(error){
        fs.unlinkSync(filePath)
        console.log(error)

    }

}

export default uploadCloudinary;