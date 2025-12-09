import { Router } from "express";
import { UploadImageToLocal, uploadFileToCloudinary, uploadImageToCloudinary } from "../controllers/upload.controller";
import upload, { uploadAllFormat } from "../middleware/multerMiddleware";

const UploadeRouter: Router = Router();

/**
 * @swagger
 * /api/local/image:
 *   post:
 *     summary: Upload multiple images to local storage
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: No files uploaded
 */
UploadeRouter.post("/local/image", upload.array("images", 5), UploadImageToLocal);

/**
 * @swagger
 * /api/cloud/image:
 *   post:
 *     summary: Upload a single image to Cloudinary
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded to Cloudinary successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 url:
 *                   type: string
 *                 details:
 *                   type: object
 *       400:
 *         description: No image file provided
 */
UploadeRouter.post("/cloud/image", upload.single("image"), uploadImageToCloudinary);

/**
 * @swagger
 * /api/cloud/all-format:
 *   post:
 *     summary: Upload a file of any type to Cloudinary
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 uri:
 *                   type: string
 *                 response:
 *                   type: object
 *       400:
 *         description: No file provided
 */
UploadeRouter.post("/cloud/all-format", uploadAllFormat.single("file"), uploadFileToCloudinary);

export default UploadeRouter;
