import React, { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { api } from "../../services/api";
import { useToast } from "../../context/ToastContext";

interface ImageUploaderProps {
  bucket: string;
  onUploaded: (url: string) => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  bucket,
  onUploaded,
  label = "Upload file or image",
}) => {
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const { data } = await api.post(`/admin/media/upload/${bucket}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedUrl = data.data.url;
      onUploaded(uploadedUrl);
      toast.success("File uploaded successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to upload file");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "14px",
          borderRadius: "var(--radius-md)",
          border: "2px dashed var(--border-medium)",
          background: "var(--surface-sunken)",
          color: "var(--text-secondary)",
          cursor: uploading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          fontSize: "13px",
          fontWeight: 600,
        }}
      >
        {uploading ? (
          <>
            <Loader2 size={18} className="spin" style={{ animation: "spin 1s linear infinite" }} />
            Uploading file...
          </>
        ) : (
          <>
            <UploadCloud size={18} color="var(--brand-accent)" />
            {label}
          </>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};
