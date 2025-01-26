import { v2 as cloudinary } from 'cloudinary';



// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null
        const response = await cloudinary.uploader.upload(localFilepath,
            {
                resource_type: "auto"
            })
        console.log(response.url, "file uploaded successfully");
        return response
        
            } catch (error) {
            fs.unlinkSync(localFilepath)
            return null
        
            }


}

export { uploadOnCloudinary}



