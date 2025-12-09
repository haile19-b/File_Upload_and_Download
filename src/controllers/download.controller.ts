import axios from 'axios';
import { Request, Response } from 'express';


/*
    This method is useful when the authentication is needed to dowload ..
    if you don't need the authentication, you can just download the file in the frontend byadding "?fl_attachment=" to the file URL 
     in the bellow format : 
     format: https://res.cloudinary.com/cloudinarystart/raw/upload/fl_attachment/v1765281146/my-files/1765281139471-Hailegebriel-Bekalu_A2SV.pdf
    ---> when the user clicks this link , it will authomatically download <---
 */

export const downloadFile = async (req: Request, res: Response):Promise<Response> => {
    try {
        const fileUrl = req.query.url as string;
        if (!fileUrl) {
            return res.status(400).json({ message: "Missing file URL" });
        }

        // Extract filename from the Cloudinary URL
        const urlObj = new URL(fileUrl);
        const pathname = urlObj.pathname;
        const filename = pathname.substring(pathname.lastIndexOf("/") + 1);

        // Fetch from Cloudinary
        const cloudinaryResponse = await axios.get(fileUrl, {
            responseType: "stream",
        });

        // Set headers with correct filename
        res.set({
            "Content-Type": cloudinaryResponse.headers["content-type"],
            "Content-Disposition": `attachment; filename="${filename}"`,
        });

        return res.send(cloudinaryResponse.data)

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error downloading file" });
    }
};

