import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, CheckCircle2, Calendar, Clock, ArrowRight, Loader2, User, Building, Mail, ChevronRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import './RequestDemo.css';

export default function RequestDemo() {
  const [step, setStep] = useState(1); // 1: Form, 2: Scheduler, 3: Success
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    size: '',
    timeline: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState('2026-08-17'); // Fictional future date
  const [selectedTime, setSelectedTime] = useState('');

  const mockTimeSlots = [
    '09:00 AM', '10:30 AM', '11:00 AM', 
    '01:30 PM', '02:00 PM', '03:30 PM', '04:00 PM'
  ];

  const mockDates = [
    { day: 'Mon', num: '17', dateStr: '2026-08-17' },
    { day: 'Tue', num: '18', dateStr: '2026-08-18' },
    { day: 'Wed', num: '19', dateStr: '2026-08-19' },
    { day: 'Thu', num: '20', dateStr: '2026-08-20' },
    { day: 'Fri', num: '21', dateStr: '2026-08-21' },
  ];

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
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.size) newErrors.size = 'Cloud size selection is required';
    if (!formData.timeline) newErrors.timeline = 'Compliance timeline is required';
    
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

    // Trigger loader, then go to Step 2
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleScheduleConfirm = (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert('Please select a time slot to confirm.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  return (
    <div className="request-demo-page container">
      {step < 3 ? (
        <div className="demo-layout">
          {/* Left panel: Info */}
          <ScrollReveal variant="fade-right" className="demo-info">
            <span className="badge badge-primary">Evaluate ThreatCheck</span>
            <h1 className="demo-title">Secure Your Operations & Map Compliance</h1>
            <p className="demo-subtitle">See how ThreatCheck's API-driven posture monitoring replaces manual checklists and keeps your organization audit-ready.</p>
            
            <div className="demo-features-list">
              <div className="demo-feat-item">
                <Check className="check-icon" size={18} />
                <div>
                  <h4>30-Minute Architecture Walkthrough</h4>
                  <p>A customized review of your current cloud deployment and security gaps.</p>
                </div>
              </div>
              
              <div className="demo-feat-item">
                <Check className="check-icon" size={18} />
                <div>
                  <h4>Framework Alignment Analysis</h4>
                  <p>Learn how to map AWS configurations to SOC 2, ISO 27001, and HIPAA criteria.</p>
                </div>
              </div>

              <div className="demo-feat-item">
                <Check className="check-icon" size={18} />
                <div>
                  <h4>Frictionless Compliance Strategy</h4>
                  <p>See how automated evidence logs eliminate developer screenshot tasks.</p>
                </div>
              </div>
            </div>

            <div className="demo-trust-card glass-panel">
              <Shield className="logo-icon text-teal" size={24} />
              <p>"ThreatCheck mapped our cloud controls in hours. The dashboard was our single source of truth during the SOC 2 audit."</p>
              <span className="author">- Compliance Lead, Apex Financial</span>
            </div>
          </ScrollReveal>

          {/* Right panel: Interacting Form/Scheduler */}
          <ScrollReveal variant="fade-left" delay={120} className="demo-interaction-box glass-panel">
            {step === 1 && (
              <form onSubmit={handleFormSubmit} className="demo-form">
                <h3 className="form-header">Request a Personalized Platform Demo</h3>
                <p className="form-sub-header">Please fill in details below to customize your walkthrough session.</p>
                
                <div className="form-group">
                  <label className="form-label"><User size={14} /> Full Name</label>
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
                  <label className="form-label"><Mail size={14} /> Work Email</label>
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
                  <label className="form-label"><Building size={14} /> Company Name</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`form-control ${errors.company ? 'input-error' : ''}`}
                    placeholder="Acme Enterprise"
                  />
                  {errors.company && <span className="error-hint">{errors.company}</span>}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Cloud Infrastructure Size</label>
                    <select 
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className={`form-control form-select ${errors.size ? 'input-error' : ''}`}
                    >
                      <option value="">Select size...</option>
                      <option value="under-50">Under 50 active servers</option>
                      <option value="50-250">50 - 250 servers</option>
                      <option value="250-1000">250 - 1,000 servers</option>
                      <option value="over-1000">1,000+ servers</option>
                    </select>
                    {errors.size && <span className="error-hint">{errors.size}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Timeline to Audit</label>
                    <select 
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className={`form-control form-select ${errors.timeline ? 'input-error' : ''}`}
                    >
                      <option value="">Select timeline...</option>
                      <option value="immediate">Under 30 days</option>
                      <option value="1-3-months">1 - 3 months</option>
                      <option value="3-6-months">3 - 6 months</option>
                      <option value="continuous">Continuous monitoring only</option>
                    </select>
                    {errors.timeline && <span className="error-hint">{errors.timeline}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Specific Requirements (Optional)</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control text-area"
                    placeholder="Let us know what platforms (AWS, GCP, Okta, etc.) you run..."
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="spin-icon" size={16} /> Processing Request...
                    </>
                  ) : (
                    <>
                      Next: Choose Schedule <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="scheduler-box">
                <h3 className="form-header">Select Date & Time</h3>
                <p className="form-sub-header">Select a time slot for your walkthrough with our Security Strategist.</p>
                
                {/* Date Grid */}
                <div className="calendar-picker">
                  {mockDates.map((d) => (
                    <button 
                      key={d.dateStr}
                      type="button"
                      className={`date-btn ${selectedDate === d.dateStr ? 'active' : ''}`}
                      onClick={() => setSelectedDate(d.dateStr)}
                    >
                      <span className="date-day">{d.day}</span>
                      <span className="date-num">{d.num}</span>
                    </button>
                  ))}
                </div>

                {/* Time Slot Selection */}
                <div className="time-slots-container">
                  <h4 className="slots-title"><Clock size={12} /> Available Slots ({selectedDate})</h4>
                  <div className="time-slots">
                    {mockTimeSlots.map((time) => (
                      <button 
                        key={time}
                        type="button"
                        className={`time-btn ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Action */}
                <div className="schedule-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleScheduleConfirm} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="spin-icon" size={16} /> Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking <Check size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      ) : (
        /* Success Screen */
        <div className="demo-success-screen glass-panel animate-fade-in">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={48} className="success-icon text-success" />
            <div className="success-icon-glow"></div>
          </div>
          
          <h2 className="success-title">Walkthrough Session Confirmed!</h2>
          <p className="success-subtitle">
            Thank you, <strong>{formData.name}</strong>. We have scheduled your 30-minute ThreatCheck platform walkthrough for:
          </p>
          
          <div className="confirmed-details-card">
            <div className="detail-item">
              <Calendar size={16} className="text-teal" />
              <span>Date: <strong>{selectedDate}</strong></span>
            </div>
            <div className="detail-item">
              <Clock size={16} className="text-teal" />
              <span>Time: <strong>{selectedTime} (UTC / Local)</strong></span>
            </div>
          </div>

          <p className="success-instructions">
            A calendar invitation containing Zoom links and dial-in details has been sent to <strong>{formData.email}</strong>.
          </p>

          <Link to="/" className="btn btn-primary">
            Back to Homepage
          </Link>
        </div>
      )}
    </div>
  );
}
