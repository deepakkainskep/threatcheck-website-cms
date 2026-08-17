import {
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { env } from "../config/env.js";
import { AppError } from "../middlewares/error.middleware.js";

let containerClientPromise: Promise<ContainerClient> | null = null;

/**
 * Lazily creates (and caches) the Azure Blob container client.
 * Throws a clear error if Azure credentials are missing instead of
 * crashing the whole process at import time.
 */
function getContainerClient(): Promise<ContainerClient> {
  if (!containerClientPromise) {
    containerClientPromise = (async () => {
      const {
        azureStorageAccountName,
        azureStorageAccountKey,
        azureStorageContainerName,
      } = env;

      if (
        !azureStorageAccountName ||
        !azureStorageAccountKey ||
        !azureStorageContainerName
      ) {
        console.error(
          "[AzureBlob] ❌ Missing Azure credentials. Ensure AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY and AZURE_STORAGE_CONTAINER_NAME are set.",
        );
        throw new AppError(
          500,
          "Azure Blob Storage is not configured. Set AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY and AZURE_STORAGE_CONTAINER_NAME.",
        );
      }

      console.log(
        `[AzureBlob] 🔌 Initialising container client → account="${azureStorageAccountName}" container="${azureStorageContainerName}"`,
      );

      const credential = new StorageSharedKeyCredential(
        azureStorageAccountName,
        azureStorageAccountKey,
      );
      const blobServiceClient = new BlobServiceClient(
        `https://${azureStorageAccountName}.blob.core.windows.net`,
        credential,
      );

      const containerClient = blobServiceClient.getContainerClient(
        azureStorageContainerName,
      );
      await containerClient.createIfNotExists();
      console.log(
        `[AzureBlob] ✅ Container client ready → container="${azureStorageContainerName}"`,
      );
      return containerClient;
    })();
  }
  return containerClientPromise;
}

/** Builds the public Azure Blob URL for a given blob name. */
export function getBlobUrl(blobName: string): string {
  return `https://${env.azureStorageAccountName}.blob.core.windows.net/${env.azureStorageContainerName}/${blobName}`;
}

/**
 * Extracts the blob name from a full Azure Blob URL, or returns the
 * input unchanged if it already looks like a plain blob name.
 */
export function extractBlobName(
  urlOrBlobName: string | undefined | null,
): string | undefined {
  if (!urlOrBlobName) return undefined;
  if (!/^https?:\/\//i.test(urlOrBlobName)) return urlOrBlobName;
  try {
    const u = new URL(urlOrBlobName);
    const parts = u.pathname.split("/").filter(Boolean);
    // parts[0] is the container name, the rest is the blob name (supports "folders")
    return parts.slice(1).join("/") || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Uploads a buffer to Azure Blob Storage under the given blob name.
 * Throws an AppError (never touches MongoDB) if the upload fails.
 */
export async function uploadBlob(
  blobName: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ url: string; blobName: string }> {
  console.log(
    `[AzureBlob] ⬆️  uploadBlob START → blobName="${blobName}" contentType="${contentType}" size=${buffer.length}B`,
  );
  try {
    const containerClient = await getContainerClient();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: contentType },
    });
    const url = getBlobUrl(blobName);
    console.log(
      `[AzureBlob] ✅ uploadBlob SUCCESS → blobName="${blobName}" url="${url}"`,
    );
    return { url, blobName };
  } catch (err: any) {
    console.error(
      `[AzureBlob] ❌ uploadBlob FAILED → blobName="${blobName}" error="${err?.message || err}"`,
    );
    if (err instanceof AppError) throw err;
    throw new AppError(
      502,
      `Azure Blob upload failed: ${err?.message || "Unknown error"}`,
    );
  }
}

/**
 * Uploads a new blob to replace an old one. This ONLY uploads the new
 * blob — callers are responsible for updating MongoDB first and only
 * deleting the old blob (via deleteBlob) after that update succeeds,
 * per the required upload -> update DB -> delete-old-blob order.
 */
export async function replaceBlob(
  newBlobName: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ url: string; blobName: string }> {
  console.log(
    `[AzureBlob] 🔄 replaceBlob → delegating to uploadBlob for newBlobName="${newBlobName}"`,
  );
  return uploadBlob(newBlobName, buffer, contentType);
}

/**
 * Deletes a blob from Azure Blob Storage. Accepts either a plain blob
 * name or a full blob URL. Safe to call even if the blob no longer
 * exists (uses deleteIfExists).
 */
export async function deleteBlob(
  urlOrBlobName: string | undefined | null,
): Promise<void> {
  const blobName = extractBlobName(urlOrBlobName || undefined);
  if (!blobName) {
    console.warn(
      `[AzureBlob] ⚠️  deleteBlob called with empty/invalid reference → input="${urlOrBlobName}" (skipping)`,
    );
    return;
  }
  console.log(`[AzureBlob] 🗑️  deleteBlob START → blobName="${blobName}"`);
  try {
    const containerClient = await getContainerClient();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const result = await blockBlobClient.deleteIfExists();
    if (result.succeeded) {
      console.log(
        `[AzureBlob] ✅ deleteBlob SUCCESS → blobName="${blobName}" (blob existed and was deleted)`,
      );
    } else {
      console.log(
        `[AzureBlob] ℹ️  deleteBlob NOOP → blobName="${blobName}" (blob did not exist, nothing deleted)`,
      );
    }
  } catch (err: any) {
    console.error(
      `[AzureBlob] ❌ deleteBlob FAILED → blobName="${blobName}" error="${err?.message || err}"`,
    );
    if (err instanceof AppError) throw err;
    throw new AppError(
      502,
      `Azure Blob delete failed: ${err?.message || "Unknown error"}`,
    );
  }
}
