import React, { useEffect, useState } from "react";
import { Mail, Loader2, Eye, Calendar, Clock, X } from "lucide-react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import { Modal } from "../components/common/Modal";

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<ContactSubmission | null>(null);

  const toast = useToast();

  const loadContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/contacts");
      setContacts(response.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>Contact Submissions</h1>
          <div className="pageHeadSub">View inquiries sent through the website contact form.</div>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
          <Loader2 size={24} className="spin" style={{ animation: "spin 1s linear infinite", marginBottom: "8px" }} />
          <div>Loading contacts...</div>
        </div>
      )}

      {!loading && (
        <div className="tableView">
          <table>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject / Department</th>
                <th>Message Preview</th>
                <th>Date Submitted</th>
                <th style={{ width: "80px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="avatar" style={{ width: "32px", height: "32px", fontSize: "12px" }}>
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", textTransform: "capitalize" }}>
                      {c.subject}
                    </span>
                  </td>
                  <td style={{ maxWidth: "300px" }}>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--text-secondary)" }}>
                      {c.message}
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="iconBtn"
                      onClick={() => setViewItem(c)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                    No contact submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={!!viewItem} onClose={() => setViewItem(null)} title="Contact Details">
        {viewItem && (
          <div style={{ display: "flex", flexDirection: "column", padding: "8px 0" }}>
            
            {/* Dark Hero Block */}
            <div style={{
              background: "var(--surface-inverse, #0B0430)",
              borderRadius: "8px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginBottom: "32px"
            }}>
              <div style={{ 
                width: "48px", height: "48px", 
                borderRadius: "50%", 
                background: "var(--brand-royal-purple)",
                color: "white", 
                display: "flex", alignItems: "center", justifyContent: "center", 
                fontSize: "20px", fontWeight: "bold"
              }}>
                {viewItem.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--gray-400, #A29BBB)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                  INQUIRY DEPARTMENT
                </div>
                <div style={{ fontSize: "18px", fontWeight: "bold", color: "var(--brand-butter-yellow, #FFFABD)", textTransform: "capitalize" }}>
                  {viewItem.subject}
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div style={{
              fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", 
              textTransform: "uppercase", letterSpacing: "1px",
              paddingBottom: "12px", borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "20px"
            }}>
              SENDER DETAILS
            </div>

            {/* Content List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", paddingLeft: "8px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "var(--brand-royal-purple)", marginTop: "-2px" }}>•</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                  Name: <strong>{viewItem.name}</strong>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "var(--brand-royal-purple)", marginTop: "-2px" }}>•</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                  Email: <a href={`mailto:${viewItem.email}`} style={{ color: "inherit", textDecoration: "underline" }}>{viewItem.email}</a>
                </span>
              </div>
            </div>

            {/* Section Header */}
            <div style={{
              fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", 
              textTransform: "uppercase", letterSpacing: "1px",
              paddingBottom: "12px", borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "20px"
            }}>
              MESSAGE CONTENT
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", paddingLeft: "8px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "var(--brand-royal-purple)", marginTop: "-2px" }}>•</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "15px", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                  {viewItem.message}
                </span>
              </div>
            </div>
            
            {/* Footer Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
              <button 
                className="btn btnOutline" 
                onClick={() => setViewItem(null)}
                style={{ background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-default)", padding: "8px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: 600 }}
              >
                Close
              </button>
              <button 
                className="btn btnPrimary"
                onClick={() => setViewItem(null)}
                style={{ background: "var(--brand-royal-purple)", color: "white", padding: "8px 20px", borderRadius: "4px", border: "none", cursor: "pointer", fontWeight: 600 }}
              >
                Reply via Email
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
