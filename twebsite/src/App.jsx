import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Security from './pages/Security';
import Contact from './pages/Contact';
import RequestDemo from './pages/RequestDemo';
import PlatformOverview from './pages/PlatformOverview';
import Features from './pages/Features';
import DashboardFeatures from './pages/DashboardFeatures';
import ScannerDashboard from './pages/ScannerDashboard';
import RiskManagement from './pages/RiskManagement';
import Frameworks from './pages/Frameworks';
import ReportingAnalytics from './pages/ReportingAnalytics';
import Automation from './pages/Automation';
import Integrations from './pages/Integrations';
import Solutions from './pages/Solutions';
import ResourcesHub from './pages/ResourcesHub';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import InsightsList from './pages/InsightsList';
import InsightsDetail from './pages/InsightsDetail';
import CaseStudiesList from './pages/CaseStudiesList';
import CaseStudiesDetail from './pages/CaseStudiesDetail';
import ResourcesDetail from './pages/ResourcesDetail';
import NotFound from './pages/NotFound';

import ScrollToTopButton from './components/ScrollToTop';
import './App.css';

// Scroll to top on navigation helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="main-content-layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/security" element={<Security />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          
          {/* Platform */}
          <Route path="/platform" element={<PlatformOverview />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard-features" element={<DashboardFeatures />} />
          <Route path="/scanner" element={<ScannerDashboard />} />
          
          {/* Redirects for deprecated security paths */}
          <Route path="/threat-detection" element={<Navigate to="/security#threat-detection" replace />} />
          <Route path="/security-monitoring" element={<Navigate to="/security#continuous-monitoring" replace />} />

          <Route path="/risk-management" element={<RiskManagement />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/reporting-analytics" element={<ReportingAnalytics />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/integrations" element={<Integrations />} />
          
          {/* Solutions */}
          <Route path="/solutions/:id" element={<Solutions />} />
          
          {/* Resources */}
          <Route path="/resources" element={<ResourcesHub />} />
          <Route path="/resources/:type/:id" element={<ResourcesDetail />} />
          
          {/* Blog */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          
          {/* Insights */}
          <Route path="/insights" element={<InsightsList />} />
          <Route path="/insights/:id" element={<InsightsDetail />} />
          
          {/* Case Studies */}
          <Route path="/case-studies" element={<CaseStudiesList />} />
          <Route path="/case-studies/:id" element={<CaseStudiesDetail />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <ScrollToTopButton />
    </Router>
  );
}

export default App;
