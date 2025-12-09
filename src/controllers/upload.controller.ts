import { Request,Response } from "express"
import cloudinary from "../config/coudinary";
export const UploadImageToLocal = async(req:Request,res:Response):Promise<Response>=>{

    if (!req.files) {
    return res.status(400).json({ message: "Error: No file uploaded" });
  }

    return res.status(200).json({
        success:true,
        message:"Image Uploaded successfully !"
    })
}

// ...existing code...
export const uploadImageToCloudinary = async (req: Request, res: Response): Promise<Response> => {

    if (!req.file || !req.file.buffer) {
        return res.status(400).json({
            success: false,
            message: "No image file provided"
        });
    }

    const fileBuffer = req.file.buffer;
    const originalName = req.file.originalname;

    try {

        // We convert the buffer to a data URI string (base64 encoded)
        const dataUri = `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`;

        const cloudinaryResponse = await cloudinary.uploader.upload(dataUri, {
            folder: 'your_app_folder',
            public_id: `${Date.now()}-${originalName}`,
            resource_type:'auto'
        });

        // 4. Get the URL and store/respond
        const imageUrl = cloudinaryResponse.secure_url;
        // Store 'imageUrl' in your database here...

        return res.status(200).json({
            message: "File uploaded to Cloudinary successfully",
            url: imageUrl,
            details: cloudinaryResponse
        });

    } catch (error: unknown) {
        console.error("Cloudinary Upload Error:", error);

        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return res.status(500).json({
            message: "Failed to upload image to Cloudinary",
            error: errorMessage
        });
    }

}

export const uploadFileToCloudinary = async(req:Request,res:Response)=>{

    if (!req.file || !req.file.buffer){
        return res.status(400).json({
            success:false,
            message:"No file Provided !"
        })
    }

    const fileBuffer = req.file.buffer;
    const fileOriginalName = req.file.originalname;

    try {
        
        const fileUri = `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`

        const responseFromCloudinary = await cloudinary.uploader.upload(fileUri,{
            folder:'my-files',
            public_id:`${Date.now()}-${fileOriginalName}`,
            resource_type:"raw"
        })

        const file_URI = responseFromCloudinary.secure_url;

        return res.status(200).json({
            success:true,
            message:"file Uploaded successfully !",
            uri:file_URI,
            response:responseFromCloudinary
        })

    } catch (error: unknown) {
        console.error("Cloudinary Upload Error:", error);

        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return res.status(500).json({
            message: "Failed to upload image to Cloudinary",
            error: errorMessage
        });
    }
}