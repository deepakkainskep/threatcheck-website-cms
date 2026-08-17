import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Globe,
  EyeOff,
  Grid,
  List as ListIcon,
  Loader2,
  FileText,
  Tag,
  ImageIcon,
  UploadCloud,
} from "lucide-react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import { Drawer } from "../components/common/Drawer";
import { Modal } from "../components/common/Modal";
import { BlockEditor } from "../components/editor/BlockEditor";
import { ImageUploader } from "../components/media/ImageUploader";
import { getMediaUrl } from "../utils/media";
import { CardMedia } from "../components/common/CardMedia";
import { ContentItem, ContentStatus } from "../types";

const labels: Record<string, string> = {
  blogs: "Blogs",
  insights: "Insights",
  "case-studies": "Case Studies",
  resources: "Resources",
  integrations: "Integrations",
  frameworks: "Frameworks",
};

const emptyItem = (type: string): ContentItem => {
  if (type === "case-studies") {
    return { title: "", slug: "", results: [], status: "DRAFT", seo: {} };
  }
  if (type === "resources") {
    return { title: "", slug: "", highlights: [], status: "DRAFT", seo: {} };
  }
  if (type === "integrations" || type === "frameworks") {
    return { name: "", slug: "", status: "DRAFT", displayOrder: 0, seo: {} };
  }
  return { title: "", slug: "", content: [], tags: [], status: "DRAFT", seo: {} };
};

export default function ContentPage({ type }: { type: string }) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<ContentItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContentItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<"general" | "blocks" | "media">("general");
  const [publishingAll, setPublishingAll] = useState(false);
  const [draftCount, setDraftCount] = useState(0);

  const toast = useToast();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/${type}`, {
        params: { search: debouncedSearch, status: statusFilter, page, limit: 12 },
      });
      setItems(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);

      // Independently track how many drafts exist (for button state)
      const { data: draftData } = await api.get(`/admin/${type}`, {
        params: { status: "DRAFT", limit: 1, page: 1 },
      });
      setDraftCount(draftData.pagination?.total ?? 0);
    } catch {
      toast.error(`Failed to load ${labels[type]}`);
    } finally {
      setLoading(false);
    }
  }, [type, debouncedSearch, statusFilter, page, toast]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSave = async () => {
    if (!editItem) return;
    const titleOrName = editItem.title || editItem.name;
    if (!titleOrName?.trim()) {
      toast.error("Title or Name is required");
      return;
    }

    setSaving(true);
    try {
      const payload = { ...editItem };
      const res = editItem._id
        ? await api.put(`/admin/${type}/${editItem._id}`, payload)
        : await api.post(`/admin/${type}`, payload);

      toast.success(`${labels[type].slice(0, -1)} saved successfully!`);
      setEditItem(null);
      loadItems();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error saving content item");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;
    try {
      await api.delete(`/admin/${type}/${deleteTarget._id}`);
      toast.success("Item deleted");
      setDeleteTarget(null);
      if (editItem?._id === deleteTarget._id) setEditItem(null);
      loadItems();
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const handleTogglePublish = async (item: ContentItem) => {
    const isPub = item.status === "PUBLISHED";
    const action = isPub ? "unpublish" : "publish";
    try {
      await api.patch(`/admin/${type}/${item._id}/${action}`);
      toast.success(`Item ${action}ed`);
      loadItems();
    } catch {
      toast.error(`Failed to ${action} item`);
    }
  };

  const handlePublishAllDrafts = async () => {
    setPublishingAll(true);
    try {
      const { data } = await api.patch(`/admin/${type}/publish-all-drafts`);
      toast.success(`Published ${data.data?.published ?? 0} draft(s) successfully!`);
      loadItems();
    } catch {
      toast.error("Failed to publish all drafts");
    } finally {
      setPublishingAll(false);
    }
  };

  const isArticle = ["blogs", "insights"].includes(type);
  const isResource = type === "resources";
  const isCase = type === "case-studies";
  const isTaxonomy = ["integrations", "frameworks"].includes(type);

  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>{labels[type] || "Content"}</h1>
          <div className="pageHeadSub">Manage dynamic website content and publications.</div>
        </div>
        <button onClick={() => { setEditItem(emptyItem(type)); setActiveTab("general"); }}>
          <Plus size={16} />
          Create {labels[type]?.slice(0, -1) || "Item"}
        </button>
      </div>

      {/* Toolbar & Filters */}
      <div className="toolbar">
        <div className="searchBox">
          <Search size={18} />
          <input
            placeholder={`Search ${labels[type]} by title, slug or category...`}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <div className="filterGroup">
          {/* Publish All Drafts button — active purple when drafts exist, muted when none */}
          <button
            onClick={handlePublishAllDrafts}
            disabled={publishingAll || draftCount === 0}
            title={draftCount > 0 ? `Publish all ${draftCount} pending draft(s)` : "No pending drafts to publish"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: draftCount > 0 ? "var(--brand-accent)" : "var(--surface-sunken, #e5e7eb)",
              color: draftCount > 0 ? "#fff" : "var(--text-muted, #9ca3af)",
              border: "1.5px solid " + (draftCount > 0 ? "var(--brand-accent)" : "var(--border-subtle, #d1d5db)"),
              padding: "8px 14px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: (publishingAll || draftCount === 0) ? "not-allowed" : "pointer",
              opacity: publishingAll ? 0.7 : 1,
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
          >
            {publishingAll
              ? <><Loader2 size={15} className="spin" style={{ animation: "spin 1s linear infinite" }} /> Publishing...</>
              : <><UploadCloud size={15} /> Publish All Drafts{draftCount > 0 ? ` (${draftCount})` : ""}</>}
          </button>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ width: "150px" }}
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
          </select>

          <div className="viewToggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              className={viewMode === "table" ? "active" : ""}
              onClick={() => setViewMode("table")}
              title="Table View"
            >
              <ListIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && items.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
          <Loader2 size={24} className="spin" style={{ animation: "spin 1s linear infinite", marginBottom: "8px" }} />
          <div>Loading {labels[type]}...</div>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="tableView" style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
          No items found. Create a new {labels[type]?.slice(0, -1)} to get started.
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && items.length > 0 && (
        <div className="cardsGrid">
          {items.map((x) => {
            const mediaSrc = getMediaUrl(x.image || x.logo);
            return (
              <article className="contentCard" key={x._id}>
                <CardMedia
                  src={mediaSrc || undefined}
                  alt={x.title || x.name || "Cover image"}
                  badge={<span className={`badge ${x.status} cardBadge`}>{x.status}</span>}
                />
                <div className="cardBody">
                  {x.category && <div className="cardCategory">{x.category}</div>}
                  <h3 className="cardTitle">{x.title || x.name}</h3>
                  <div className="cardExcerpt">{x.excerpt || x.description || "No description provided."}</div>
                </div>
                <div className="cardFooter">
                  <div className="cardActions">
                    <button className="btnSecondary" style={{ padding: "6px 12px" }} onClick={() => { setEditItem(x); setActiveTab("general"); }}>
                      <Edit2 size={14} /> Edit
                    </button>
                    <button className="btnSecondary" style={{ padding: "6px 12px" }} onClick={() => handleTogglePublish(x)}>
                      {x.status === "PUBLISHED" ? <EyeOff size={14} /> : <Globe size={14} />}
                    </button>
                  </div>
                  <button className="btnDanger" style={{ padding: "6px 10px" }} onClick={() => setDeleteTarget(x)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && items.length > 0 && (
        <div className="tableView">
          <table>
            <thead>
              <tr>
                <th>Title / Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x._id}>
                  <td className="tableTitle">{x.title || x.name}</td>
                  <td>{x.category || "-"}</td>
                  <td><span className={`badge ${x.status}`}>{x.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btnSecondary" style={{ padding: "4px 10px" }} onClick={() => { setEditItem(x); setActiveTab("general"); }}>
                        <Edit2 size={14} /> Edit
                      </button>
                      <button className="btnSecondary" style={{ padding: "4px 10px" }} onClick={() => handleTogglePublish(x)}>
                        {x.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                      </button>
                      <button className="btnDanger" style={{ padding: "4px 8px" }} onClick={() => setDeleteTarget(x)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="pagination">
          <div className="paginationInfo">
            Page {page} of {totalPages}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btnSecondary" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <button className="btnSecondary" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Slide-over Edit Drawer */}
      <Drawer
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title={editItem?._id ? `Edit ${labels[type]?.slice(0, -1)}` : `Create ${labels[type]?.slice(0, -1)}`}
        subtitle="Modify dynamic item details, rich content blocks, and media assets."
        width="680px"
      >
        {editItem && (
          <>
            <div className="tabs">
              <button className={`tabBtn ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
                <FileText size={16} /> General Info
              </button>
              {(isArticle || isCase || isResource) && (
                <button className={`tabBtn ${activeTab === "blocks" ? "active" : ""}`} onClick={() => setActiveTab("blocks")}>
                  <Tag size={16} /> Content & Blocks
                </button>
              )}
              <button className={`tabBtn ${activeTab === "media" ? "active" : ""}`} onClick={() => setActiveTab("media")}>
                <ImageIcon size={16} /> Media Assets
              </button>
            </div>

            {/* TAB 1: General Info */}
            {activeTab === "general" && (
              <div style={{ display: "grid", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>{isTaxonomy ? "Name" : "Title"}</label>
                  <input
                    placeholder={isTaxonomy ? "Name" : "Title"}
                    value={editItem.title || editItem.name || ""}
                    onChange={(e) => setEditItem({ ...editItem, [isTaxonomy ? "name" : "title"]: e.target.value })}
                  />
                </div>


                <div className="formGrid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Category</label>
                    <input
                      placeholder="Category"
                      value={editItem.category || ""}
                      onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Publication Status</label>
                    <select
                      value={editItem.status || "DRAFT"}
                      onChange={(e) => setEditItem({ ...editItem, status: e.target.value as ContentStatus })}
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                    </select>
                  </div>
                </div>

                {isArticle && (
                  <div className="formGrid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Author Name</label>
                      <input
                        placeholder="Author Name"
                        value={editItem.author || ""}
                        onChange={(e) => setEditItem({ ...editItem, author: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Reading Time</label>
                      <input
                        placeholder="e.g. 5 min read"
                        value={editItem.readingTime || ""}
                        onChange={(e) => setEditItem({ ...editItem, readingTime: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Excerpt / Summary</label>
                  <textarea
                    placeholder="Short description for preview cards..."
                    value={editItem.excerpt || editItem.description || ""}
                    onChange={(e) => setEditItem({ ...editItem, [isTaxonomy ? "description" : "excerpt"]: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Content & Blocks */}
            {activeTab === "blocks" && (
              <div style={{ display: "grid", gap: "16px" }}>
                {isArticle && (
                  <BlockEditor
                    value={editItem.content || []}
                    onChange={(content) => setEditItem({ ...editItem, content })}
                  />
                )}

                {isCase && (
                  <>
                    <textarea
                      placeholder="Challenge description..."
                      value={editItem.challenge || ""}
                      onChange={(e) => setEditItem({ ...editItem, challenge: e.target.value })}
                    />
                    <textarea
                      placeholder="Solution description..."
                      value={editItem.solution || ""}
                      onChange={(e) => setEditItem({ ...editItem, solution: e.target.value })}
                    />
                    <textarea
                      placeholder="Business impact summary..."
                      value={editItem.businessImpact || ""}
                      onChange={(e) => setEditItem({ ...editItem, businessImpact: e.target.value })}
                    />
                  </>
                )}

                {isResource && (
                  <div>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Key Highlights (one per line)</label>
                    <textarea
                      value={(editItem.highlights || []).join("\n")}
                      onChange={(e) => setEditItem({ ...editItem, highlights: e.target.value.split("\n") })}
                    />
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Media */}
            {activeTab === "media" && (
              <div style={{ display: "grid", gap: "16px" }}>
                <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Cover Image / Logo</label>
                {getMediaUrl(editItem.image || editItem.logo) && (
                  <img
                    src={getMediaUrl(editItem.image || editItem.logo)}
                    alt="Preview"
                    style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-medium)" }}
                  />
                )}
                <ImageUploader
                  bucket={type}
                  onUploaded={(url) => setEditItem({ ...editItem, [isTaxonomy ? "logo" : "image"]: url })}
                />
                {(editItem.image || editItem.logo) && (
                  <button className="btnDanger" onClick={() => setEditItem({ ...editItem, image: "", logo: "" })}>
                    Remove Cover Image
                  </button>
                )}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)" }}>
              <button className="btnSecondary" onClick={() => setEditItem(null)}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </Drawer>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Deletion"
        maxWidth="440px"
      >
        <div style={{ display: "grid", gap: "16px" }}>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            Are you sure you want to delete <strong>{deleteTarget?.title || deleteTarget?.name}</strong>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button className="btnSecondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </button>
            <button className="btnDanger" onClick={handleDelete}>
              Delete Item
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
