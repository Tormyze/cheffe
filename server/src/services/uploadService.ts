import { randomUUID } from "node:crypto";
import sharp, { type Metadata } from "sharp";
import {
  getSupabaseClient,
  getSupabaseStorageBucket,
} from "../config/supabase";
import type { UploadType } from "../types/upload";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["jpeg", "png", "webp"];

const uploadError = (message: string, statusCode = 400) => {
  const error = new Error(message);
  Object.assign(error, { statusCode });
  return error;
};

export const processAndUploadImage = async (
  buffer: Buffer,
  userId: string,
  type: UploadType,
) => {
  if (!buffer || buffer.length === 0) {
    throw uploadError("Nenhuma imagem foi enviada.");
  }

  if (buffer.length > MAX_IMAGE_SIZE) {
    throw uploadError("A imagem deve ter no máximo 5 MB.");
  }

  let metadata: Metadata;

  try {
    metadata = await sharp(buffer).metadata();
  } catch {
    throw uploadError("O arquivo enviado não é uma imagem válida.");
  }

  if (!metadata.format || !SUPPORTED_FORMATS.includes(metadata.format)) {
    throw uploadError("Envie uma imagem JPEG, PNG ou WebP.");
  }

  const dimension = type === "avatar" ? 512 : 1200;
  const processedImage = await sharp(buffer)
    .rotate()
    .resize(dimension, dimension, {
      fit: "cover",
      position: "centre",
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toBuffer();

  const path =
    type === "avatar"
      ? `avatars/${userId}.webp`
      : `recipes/${userId}/${randomUUID()}.webp`;

  const bucket = getSupabaseStorageBucket();
  const supabase = getSupabaseClient();

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, processedImage, {
      contentType: "image/webp",
      cacheControl: "3600",
      upsert: type === "avatar",
    });

  if (error) {
    console.error("Erro ao enviar imagem ao Supabase:", error);
    throw uploadError("Não foi possível armazenar a imagem.", 500);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return {
    url: data.publicUrl,
    path,
  };
};
