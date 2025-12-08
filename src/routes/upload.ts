import { Router } from "express";
import { UploadImageToLocal, uploadImageToCloudinary } from "../controllers/upload.controller";
import upload from "../middleware/multerMiddleware";

const UploadeRouter:Router = Router()

UploadeRouter.post("/local/image", upload.array("images", 5), UploadImageToLocal)
// Use the cloud upload handler for the single-image cloud route
UploadeRouter.post("/cloud/image", upload.single("image"), uploadImageToCloudinary)

export default UploadeRouter