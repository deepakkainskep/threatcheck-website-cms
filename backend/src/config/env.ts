import dotenv from "dotenv";
dotenv.config();
export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/threatcheck",
  accessSecret: process.env.JWT_ACCESS_SECRET || "dev-access-secret-change",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change",
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  cmsUrl: process.env.CMS_URL || "http://localhost:5174",
  publicUrl: process.env.PUBLIC_WEBSITE_URL || "http://localhost:3000",
  uploadDir: process.env.UPLOAD_DIR || "uploads",
  maxFileSize: Number(process.env.MAX_FILE_SIZE || 5 * 1024 * 1024),
  azureStorageAccountName: process.env.AZURE_STORAGE_ACCOUNT_NAME || "",
  azureStorageAccountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY || "",
  azureStorageContainerName:
    process.env.AZURE_STORAGE_CONTAINER_NAME || "threatcheck-media",
};
