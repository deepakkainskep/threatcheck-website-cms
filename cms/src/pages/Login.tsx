import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { login } from "../store/authStore";
import logo from "../assests/logo.png";
import iconLogo from "../assests/icon-only-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email credentials or password");
      setLoading(false);
    }
  };

  return (
    <div className="loginSplitWrapper">
      <div className="loginLeftPanel">
        <img src={iconLogo} alt="ThreatCheck Icon" className="loginIcon" />
        <h2 className="loginBrandText">
          ThreatCheck Website CMS Portal
        </h2>
      </div>

      <div className="loginRightPanel">
        <form onSubmit={handleSubmit} className="loginFormCard">
          <img src={logo} alt="ThreatCheck" className="loginMainLogo" />

          <div className="loginHeaderGroup">
            <h1 className="loginTitle">Admin Panel</h1>
            <p className="loginSubtitle">Platform staff sign-in</p>
          </div>

          {error && (
            <div className="toastItem toast-error" style={{ fontSize: "13px", padding: "10px 14px", marginBottom: "16px" }}>
              {error}
            </div>
          )}

          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px", display: "block", fontWeight: 500 }}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="loginInput"
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px", display: "block", fontWeight: 500 }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="loginInput"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="loginSubmitBtn">
            {loading ? (
              <>
                <Loader2 size={18} className="spin" style={{ animation: "spin 1s linear infinite" }} />
                Authenticating...
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
