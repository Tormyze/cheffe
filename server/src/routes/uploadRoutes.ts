import { Router } from "express";
import { uploadImage as uploadImageController } from "../controller/uploadController";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  handleUploadError,
  uploadImage,
} from "../middlewares/uploadMiddleware";

const router = Router();

router.post(
  "/",
  authenticateToken,
  uploadImage,
  handleUploadError,
  uploadImageController,
);

export default router;
