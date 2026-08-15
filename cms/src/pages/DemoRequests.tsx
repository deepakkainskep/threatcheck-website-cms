import React, { useEffect, useState } from "react";
import { Mail, MessageSquare, Loader2, Eye, Calendar, Clock, X } from "lucide-react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import { Modal } from "../components/common/Modal";

interface DemoRequest {
  _id: string;
  name: string;
  email: string;
  company: string;
  size: string;
  timeline: string;
  message?: string;
  selectedDate: string;
  selectedTime: string;
  createdAt: string;
}

export default function DemoRequests() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<DemoRequest | null>(null);

  const toast = useToast();

  const loadRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/demo-requests");
      setRequests(response.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load demo requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>Demo Requests</h1>
          <div className="pageHeadSub">View and manage demo session bookings.</div>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
          <Loader2 size={24} className="spin" style={{ animation: "spin 1s linear infinite", marginBottom: "8px" }} />
          <div>Loading demo requests...</div>
        </div>
      )}

      {!loading && (
        <div className="tableView">
          <table>
            <thead>
              <tr>
                <th>Lead</th>
                <th>Company & Size</th>
                <th>Timeline</th>
                <th>Scheduled For</th>
                <th>Date Submitted</th>
                <th style={{ width: "80px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="avatar" style={{ width: "32px", height: "32px", fontSize: "12px" }}>
                        {r.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{r.name}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{r.company}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{r.size} servers</div>
                  </td>
                  <td>
                    <span className="badge" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                      {r.timeline}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={12} /> {r.selectedDate}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} /> {r.selectedTime}
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="iconBtn"
                      onClick={() => setViewItem(r)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                    No demo requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={!!viewItem} onClose={() => setViewItem(null)} title="Demo Request Details">
        {viewItem && (
          <div style={{ display: "flex", flexDirection: "column", padding: "8px 0" }}>
            
            {/* Dark Hero Block (matches Risk Score box) */}
            <div style={{
              background: "var(--surface-inverse, #0B0430)",
              borderRadius: "8px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginBottom: "32px"
            }}>
              <div style={{ fontSize: "42px", fontWeight: "bold", color: "var(--brand-butter-yellow, #FFFABD)", lineHeight: "1" }}>
                {viewItem.size}
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--gray-400, #A29BBB)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                  CLOUD SIZE
                </div>
                <div style={{ fontSize: "14px", color: "var(--gray-400, #A29BBB)" }}>
                  / {viewItem.timeline} timeline
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
              LEAD DETAILS & CONTEXT
            </div>

            {/* Content List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", paddingLeft: "8px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "var(--brand-royal-purple)", marginTop: "-2px" }}>•</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                  Requested by <strong>{viewItem.name}</strong> from <strong>{viewItem.company}</strong>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "var(--brand-royal-purple)", marginTop: "-2px" }}>•</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                  Contact email: <a href={`mailto:${viewItem.email}`} style={{ color: "inherit", textDecoration: "underline" }}>{viewItem.email}</a>
                </span>
              </div>
              {viewItem.message && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ color: "var(--brand-royal-purple)", marginTop: "-2px" }}>•</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                    Additional notes: {viewItem.message}
                  </span>
                </div>
              )}
            </div>

            {/* Section Header */}
            <div style={{
              fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", 
              textTransform: "uppercase", letterSpacing: "1px",
              paddingBottom: "12px", borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "20px"
            }}>
              SCHEDULING & LOGISTICS
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", paddingLeft: "8px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "var(--brand-royal-purple)", marginTop: "-2px" }}>•</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                  Preferred Date: <strong>{viewItem.selectedDate}</strong>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "var(--brand-royal-purple)", marginTop: "-2px" }}>•</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                  Preferred Time: <strong>{viewItem.selectedTime}</strong>
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
                Mark as Contacted
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
