import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Globe, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import PremiumHero from '../components/PremiumHero';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'sales',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.message) newErrors.message = 'Message content is required';
    
    if (!formData.email) {
      newErrors.email = 'Work email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'sales', message: '' });
      
      // Reset success state after a few seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    }, 1200);
  };

  return (
    <div className="contact-page-wrapper">
      <PremiumHero
        label="CONTACT US"
        titleLine1="Connect with a"
        titleLine2="ThreatCheck Specialist"
        description="Have questions about continuous cloud posture mapping, integrations, or framework mapping? Select a channel below to get in touch with our team."
      />
      
      <div className="contact-page container" style={{ paddingTop: '2rem' }}>
        <div className="contact-layout">
        {/* Left: Contact Info Channels */}
        <ScrollReveal variant="fade-right" className="contact-channels" stagger>
          <div className="channel-box glass-panel text-left">
            <div className="channel-icon-container">
              <Mail className="channel-icon text-teal" size={20} />
            </div>
            <div>
              <h3>Inquiries & Demo Plans</h3>
              <p>Schedule a platform deep-dive or request custom enterprise framework mapping.</p>
              <a href="mailto:sales@threatcheck-demo.com" className="channel-link">sales@threatcheck-demo.com</a>
            </div>
          </div>

          <div className="channel-box glass-panel text-left">
            <div className="channel-icon-container">
              <MessageSquare className="channel-icon text-purple" size={20} />
            </div>
            <div>
              <h3>Security & Compliance Stance</h3>
              <p>Request security questionnaires, SOC 2 Type II audits under NDA, or subprocessor logs.</p>
              <a href="mailto:security@threatcheck-demo.com" className="channel-link">security@threatcheck-demo.com</a>
            </div>
          </div>

          <div className="channel-box glass-panel text-left">
            <div className="channel-icon-container">
              <Globe className="channel-icon text-accent" size={20} />
            </div>
            <div>
              <h3>Corporate headquarters</h3>
              <p>ThreatCheck Security Technologies Inc.</p>
              <address className="channel-address">
                100 Pine Street, Suite 1200<br />
                San Francisco, CA 94111, USA
              </address>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Submission Form */}
        <ScrollReveal variant="fade-left" delay={150} className="contact-form-wrapper glass-panel">
          {submitted ? (
            <div className="contact-success-banner animate-fade-in">
              <CheckCircle2 size={40} className="success-icon text-success" />
              <h3>Message Submitted Successfully!</h3>
              <p>Thank you for reaching out. A ThreatCheck security representative will review your request and reply within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="contact-form">
              <h3 className="form-title">Send a Direct Message</h3>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-control ${errors.name ? 'input-error' : ''}`}
                  placeholder="Marcus Thorne"
                />
                {errors.name && <span className="error-hint">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Work Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-control ${errors.email ? 'input-error' : ''}`}
                  placeholder="marcus@company.com"
                />
                {errors.email && <span className="error-hint">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Department</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-control form-select"
                >
                  <option value="sales">Sales & Custom Pricing Models</option>
                  <option value="security">Security Team & SOC 2 Access</option>
                  <option value="support">Customer Support & APIs</option>
                  <option value="partner">Corporate Partnerships</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-control text-area ${errors.message ? 'input-error' : ''}`}
                  placeholder="Tell us about your cloud structure, compliance timelines, or support requirements..."
                  rows="4"
                />
                {errors.message && <span className="error-hint">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary w-full submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="spin-icon" size={16} /> Submitting...
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </div>
    </div>
  );
}
