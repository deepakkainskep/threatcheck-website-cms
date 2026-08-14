import React, { useState } from "react";
import { Search, Save, Globe } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function SEOPage() {
  const [seo, setSeo] = useState({
    title: "ThreatCheck - Continuous Cloud Security & Compliance Management",
    description: "ThreatCheck automates continuous vulnerability assessment, cloud compliance, and real-time threat intelligence for enterprise infrastructure.",
    keywords: "cloud security, threat intelligence, vulnerability management, compliance",
    canonicalUrl: "https://threatcheck.io",
  });

  const toast = useToast();

  const handleSave = () => {
    toast.success("SEO Metadata configurations saved!");
  };

  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>SEO Metadata Management</h1>
          <div className="pageHeadSub">Configure default search engine titles, descriptions, and OpenGraph share snippets.</div>
        </div>
        <button onClick={handleSave}>
          <Save size={16} /> Save SEO Config
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px" }}>
        <div className="tableView" style={{ padding: "24px", display: "grid", gap: "16px" }}>
          <h3 style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Search size={18} color="var(--brand-accent)" /> Global SEO Settings
          </h3>

          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Default Meta Title</label>
            <input
              value={seo.title}
              onChange={(e) => setSeo({ ...seo, title: e.target.value })}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Default Meta Description</label>
            <textarea
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              rows={4}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Keywords (comma separated)</label>
            <input
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Canonical Website URL</label>
            <input
              value={seo.canonicalUrl}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="tableView" style={{ padding: "24px", display: "grid", gap: "16px" }}>
          <h3 style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Globe size={18} color="var(--brand-accent)" /> Search Result Snippet Preview
          </h3>

          <div style={{ background: "var(--surface-card)", padding: "20px", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: "12px", color: "var(--green-600)" }}>https://threatcheck.io</div>
            <div style={{ fontSize: "18px", color: "var(--text-link)", fontWeight: 600, marginTop: "4px", lineHeight: 1.3 }}>
              {seo.title || "Page Title"}
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "6px", lineHeight: 1.4 }}>
              {seo.description || "Meta description snippet will appear here in search engine results."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
