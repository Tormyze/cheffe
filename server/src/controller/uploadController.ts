import type { Response } from "express";
import { prisma } from "../database/prisma";
import type { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { processAndUploadImage } from "../services/uploadService";
import type { UploadType } from "../types/upload";

const isUploadType = (value: unknown): value is UploadType =>
  value === "avatar" || value === "recipe";

export const uploadImage = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: "Usuário não autenticado.",
      });
    }

    const type = req.query.type;

    if (!isUploadType(type)) {
      return res.status(400).json({
        error: "O parâmetro type deve ser \"avatar\" ou \"recipe\".",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Nenhuma imagem foi enviada.",
      });
    }

    const uploadedImage = await processAndUploadImage(
      req.file.buffer,
      userId,
      type,
    );

    if (type === "avatar") {
      await prisma.user.update({
        where: { id: userId },
        data: { avatarUrl: uploadedImage.url },
      });
    }

    return res.status(200).json(uploadedImage);
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && "statusCode" in error
        ? Number(error.statusCode)
        : 500;

    const message =
      error instanceof Error
        ? error.message
        : "Erro interno ao processar a imagem.";

    console.error("Erro no upload:", error);
    return res.status(statusCode).json({ error: message });
  }
};
