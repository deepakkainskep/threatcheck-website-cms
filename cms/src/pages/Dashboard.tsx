import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { api } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    insights: 0,
    caseStudies: 0,
    resources: 0,
    media: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [b, i, c, r, m] = await Promise.allSettled([
          api.get("/admin/blogs?limit=1"),
          api.get("/admin/insights?limit=1"),
          api.get("/admin/case-studies?limit=1"),
          api.get("/admin/resources?limit=1"),
          api.get("/admin/media"),
        ]);

        setStats({
          blogs: b.status === "fulfilled" ? b.value.data.pagination?.total || 0 : 0,
          insights: i.status === "fulfilled" ? i.value.data.pagination?.total || 0 : 0,
          caseStudies: c.status === "fulfilled" ? c.value.data.pagination?.total || 0 : 0,
          resources: r.status === "fulfilled" ? r.value.data.pagination?.total || 0 : 0,
          media: m.status === "fulfilled" ? m.value.data.data?.length || 0 : 0,
        });
      } catch {
        // Fallback gracefully
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const metrics = [
    { label: "Blog Articles", value: stats.blogs, icon: BookOpen, href: "/blogs" },
    { label: "Security Insights", value: stats.insights, icon: FileText, href: "/insights" },
    { label: "Case Studies", value: stats.caseStudies, icon: FolderOpen, href: "/case-studies" },
    { label: "Media Assets", value: stats.media, icon: ImageIcon, href: "/media" },
  ];

  const quickActions = [
    { label: "Publish New Blog Post", href: "/blogs", icon: BookOpen },
    { label: "Add Security Insight", href: "/insights", icon: FileText },
    { label: "Add Case Study", href: "/case-studies", icon: FolderOpen },
    { label: "Upload Media Asset", href: "/media", icon: ImageIcon },
  ];

  return (
    <section>
      <div className="pageHead">
        <div>
          <h1>ThreatCheck Overview</h1>
          <div className="pageHeadSub">
            Manage dynamic cybersecurity content, research publications, and dynamic APIs.
          </div>
        </div>
      </div>

      <div className="metricsGrid">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div className="metricCard" key={label}>
            <div className="metricIcon">
              <Icon size={24} />
            </div>
            <div>
              <div className="metricVal">{loading ? "-" : value}</div>
              <div className="metricLabel">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sectionPanel">
        <div className="sectionPanelHead">
          <h3>
            <Sparkles size={20} />
            Quick Content Actions
          </h3>
          <p>Jump straight into publishing new content to the ThreatCheck pipeline.</p>
        </div>

        <div className="quickActionsGrid">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link to={href} key={label} className="quickActionCard">
              <div className="quickActionIcon">
                <Icon size={20} />
              </div>
              <span className="quickActionLabel">{label}</span>
              <ArrowRight size={16} className="quickActionArrow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
