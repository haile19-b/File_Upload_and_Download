import { Router } from "express";
import { downloadFile } from "../controllers/download.controller";

const downloadRouter:Router = Router()

downloadRouter.get('/download',downloadFile)

export default downloadRouter;