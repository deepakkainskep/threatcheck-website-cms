import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { LogOut, Globe, ArrowUpRight, Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { currentUser, logout } from "../../store/authStore";
import { PUBLIC_SITE_URL } from "../../config";

export const CMSLayout: React.FC = () => {
  const user = currentUser();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar isOpen={navOpen} onClose={() => setNavOpen(false)} />
      {navOpen && <div className="sidebarScrim" onClick={() => setNavOpen(false)} />}
      <main>
        <header className="topbar">
          <div className="topbarLeft">
            <button
              className="mobileMenuBtn"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="statusIndicator">
              <span className="statusDot"></span>
              <span className="statusLabelFull">API Status: Online</span>
              <span className="statusLabelShort">Online</span>
            </div>
          </div>

          <div className="topbarRight">
            <a
              href={PUBLIC_SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="viewSiteBtn"
              title="Open the public website in a new tab"
            >
              <span className="viewSiteIconWrap">
                <Globe size={15} />
              </span>
              <span className="viewSiteText">
                <span className="viewSiteLabel">View Public Website</span>
                <span className="viewSiteMeta">
                  <span className="viewSiteDot"></span>
                  Live
                </span>
              </span>
              <ArrowUpRight size={16} className="viewSiteArrow" />
            </a>
            <button
              className="iconBtn"
              onClick={logout}
              title="Log out of CMS"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};
