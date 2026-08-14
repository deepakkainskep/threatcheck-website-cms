import React, { useEffect, useState } from "react";
import { Copy, Trash2, FileText, Check, Loader2 } from "lucide-react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import { Modal } from "../components/common/Modal";
import { getMediaUrl, formatBytes } from "../utils/media";
import { MediaItem } from "../types";

export default function Media() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const toast = useToast();

  async function loadMedia() {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/media");
      setItems(data.data || []);
    } catch {
      toast.error("Failed to load media library");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMedia();
  }, []);

  const handleCopyUrl = (item: MediaItem) => {
    const fullUrl = getMediaUrl(item.url);
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item._id);
    toast.info("Media URL copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/media/${deleteTarget._id}`);
      toast.success("Media file deleted");
      setDeleteTarget(null);
      loadMedia();
    } catch {
      toast.error("Failed to delete media file");
    }
  };

  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>Media Library</h1>
          <div className="pageHeadSub">Upload and manage images, diagrams, and PDF whitepapers.</div>
        </div>
      </div>



      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
          <Loader2 size={24} className="spin" style={{ animation: "spin 1s linear infinite", marginBottom: "8px" }} />
          <div>Loading media files...</div>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="tableView" style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
          No media files uploaded yet. Use the upload box above.
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="mediaGrid">
          {items.map((m) => {
            const isImg = m.mimeType?.startsWith("image");
            const fullSrc = getMediaUrl(m.url);
            return (
              <div className="mediaCard" key={m._id}>
                {isImg ? (
                  <img className="mediaPreview" src={fullSrc} alt={m.originalName} />
                ) : (
                  <div className="mediaPreview" style={{ display: "grid", placeItems: "center" }}>
                    <FileText size={42} color="var(--border-medium)" />
                  </div>
                )}
                <div style={{ fontSize: "13px", fontWeight: 600, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} title={m.originalName}>
                  {m.originalName}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }}>
                  <span>{formatBytes(m.size)}</span>
                  <span>{m.mimeType?.split("/")[1]?.toUpperCase()}</span>
                </div>
                <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>

                  <button
                    className="btnDanger"
                    style={{ flex: 1, padding: "6px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                    onClick={() => setDeleteTarget(m)}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Media File"
        maxWidth="420px"
      >
        <div style={{ display: "grid", gap: "16px" }}>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            Are you sure you want to delete <strong>{deleteTarget?.originalName}</strong>?
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button className="btnSecondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </button>
            <button className="btnDanger" onClick={handleDelete}>
              Delete File
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
