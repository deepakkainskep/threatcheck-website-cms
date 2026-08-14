import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Layers,
  LockKeyhole,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { currentUser } from "../../store/authStore";
import logo from "../../assests/logo.png";

const contentLinks = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/blogs", label: "Blogs", icon: BookOpen },
  { to: "/insights", label: "Insights", icon: FileText },
  { to: "/case-studies", label: "Case Studies", icon: FolderOpen },
  { to: "/resources", label: "Resources", icon: Layers },
];

const taxonomyLinks = [
  { to: "/integrations", label: "Integrations", icon: ShieldCheck },
  { to: "/frameworks", label: "Frameworks", icon: LockKeyhole },
  { to: "/media", label: "Media Library", icon: ImageIcon },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const user = currentUser();
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="brand">
        <div className="brandPlate">
          <img src={logo} alt="ThreatCheck" className="brandLogoImg" />
        </div>
        <span className="cmsTag">CMS</span>
        <button className="sidebarCloseBtn" onClick={onClose} aria-label="Close menu">
          <X size={18} />
        </button>
      </div>

      <nav className="navSection">
        <div className="navTitle">Overview & Content</div>
        {contentLinks.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <nav className="navSection">
        <div className="navTitle">Assets & Taxonomies</div>
        {taxonomyLinks.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <nav className="navSection">
        <div className="navTitle">Administration</div>
        {user?.role === "SUPERADMIN" && (
          <NavLink to="/users" onClick={onClose}>
            <Users size={18} />
            Admin Users
          </NavLink>
        )}
      </nav>

      <div className="sidebarFooter">
        <div className="avatar">{userInitial}</div>
        <div className="userInfo">
          <strong>{user?.name || "Administrator"}</strong>
          <span>{user?.role || "ADMIN"}</span>
        </div>
      </div>
    </aside>
  );
};
