import React, { useState } from "react";
import { Save, Settings as SettingsIcon, Bell } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "ThreatCheck Portal",
    contactEmail: "security@threatcheck.io",
    supportEmail: "support@threatcheck.io",
    maintenanceMode: false,
    enableAuditLogs: true,
  });

  const toast = useToast();

  const handleSave = () => {
    toast.success("Website settings updated successfully!");
  };

  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>Website Settings</h1>
          <div className="pageHeadSub">Manage portal parameters, system contact emails, and maintenance modes.</div>
        </div>
        <button onClick={handleSave}>
          <Save size={16} /> Save Settings
        </button>
      </div>

      <div className="tableView" style={{ padding: "28px", maxWidth: "680px", display: "grid", gap: "20px" }}>
        <h3 style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
          <SettingsIcon size={18} color="var(--brand-accent)" /> General Portal Parameters
        </h3>

        <div>
          <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Website / Organization Name</label>
          <input
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Security Officer Email</label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>Customer Support Email</label>
          <input
            type="email"
            value={settings.supportEmail}
            onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "var(--surface-sunken)", borderRadius: "8px" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>Maintenance Mode</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Restrict public access while updating core website systems.</div>
          </div>
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "var(--surface-sunken)", borderRadius: "8px" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>Audit Trail Logging</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Record administrator create, update, and delete actions.</div>
          </div>
          <input
            type="checkbox"
            checked={settings.enableAuditLogs}
            onChange={(e) => setSettings({ ...settings, enableAuditLogs: e.target.checked })}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>
      </div>
    </section>
  );
}
