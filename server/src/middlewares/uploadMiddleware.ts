import multer, { MulterError } from "multer";
import type { NextFunction, Request, Response } from "express";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback,
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    callback(
      new MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "image",
      ),
    );
    return;
  }

  callback(null, true);
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
    files: 1,
  },
}).single("image");

export const handleUploadError = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "A imagem deve ter no máximo 5 MB.",
      });
    }

    if (
      error.code === "LIMIT_UNEXPECTED_FILE" &&
      error.field === "image"
    ) {
      return res.status(400).json({
        error: "Envie uma imagem JPEG, PNG ou WebP no campo \"image\".",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        error: "Envie apenas uma imagem por upload.",
      });
    }

    return res.status(400).json({
      error: "Arquivo inválido.",
    });
  }

  return next(error);
};
