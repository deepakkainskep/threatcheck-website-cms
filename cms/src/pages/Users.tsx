import React, { useEffect, useState } from "react";
import { UserPlus, Shield, Mail, User as UserIcon, Loader2 } from "lucide-react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import { Modal } from "../components/common/Modal";
import { User, Role } from "../types";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "SUPERADMIN" as Role });

  const toast = useToast();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load admin users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Name, email, and password are required");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setCreating(true);
    try {
      await api.post("/admin/users", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      toast.success(`Admin ${form.name} created successfully!`);
      setForm({ name: "", email: "", password: "", role: "SUPERADMIN" });
      setShowModal(false);
      loadUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create admin");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>Admin Management</h1>
          <div className="pageHeadSub">Manage user accounts.</div>
        </div>
        <button onClick={() => setShowModal(true)}>
          <UserPlus size={16} />
          Create User
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
          <Loader2 size={24} className="spin" style={{ animation: "spin 1s linear infinite", marginBottom: "8px" }} />
          <div>Loading administrators...</div>
        </div>
      )}

      {!loading && (
        <div className="tableView">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="avatar" style={{ width: "32px", height: "32px", fontSize: "12px" }}>
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="tableTitle">{u.name}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Mail size={14} color="var(--text-muted)" />
                      {u.email}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${u.role === "SUPERADMIN" ? "PUBLISHED" : "DRAFT"}`}>
                      <Shield size={12} />
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: "var(--status-success-fg)", fontSize: "13px", fontWeight: 600 }}>Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form for Creating User */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Admin User"
        maxWidth="500px"
      >
        <form onSubmit={handleCreateUser} style={{ display: "grid", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Full Name</label>
            <input
              placeholder="e.g. Sarah Connor"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Email Address</label>
            <input
              type="email"
              placeholder="sarah@threatcheck.local"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Password (min 8 chars)</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>


          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
            <button type="button" className="btnSecondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" disabled={creating}>
              {creating ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
