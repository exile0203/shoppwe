import {v2 as cloudinary} from 'cloudinary';
import { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET } from './envConfig.js';

try{
    if(!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_SECRET){
        throw new Error("Cloudinary configuration variables are missing");
    }
    cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_SECRET,
});
}catch(err){
    console.error("Cloudinary configuration error:", err.message);
    process.exit(1);
}


export default cloudinary;