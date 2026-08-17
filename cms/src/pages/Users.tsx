import React, { useEffect, useState } from "react";
import { UserPlus, Shield, Mail, User as UserIcon, Loader2 } from "lucide-react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import { Modal } from "../components/common/Modal";
import { User, Role } from "../types";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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



  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>Admin Management</h1>
          <div className="pageHeadSub">Manage user accounts.</div>
        </div>
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

    </section>
  );
}
