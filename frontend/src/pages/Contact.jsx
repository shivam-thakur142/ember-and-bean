import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Mail, Phone, Instagram, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactMessage } from '../services/api';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please provide your name, email address, and message.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitContactMessage(formData);
      if (res?.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        throw new Error(res?.message || 'Failed to submit message.');
      }
    } catch (err) {
      setError(err.message || 'Submission failed. Please check network connectivity.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-grid">
          {/* Info Side */}
          <div className="contact-info-col">
            <div>
              <span className="eyebrow">GET IN TOUCH</span>
              <h1 className="contact-headline">We welcome your presence & voice.</h1>
              <p style={{ marginTop: '0.8rem', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Whether you have an inquiry about private event hosting, seasonal wholesale bean orders, or simply want to say hello, we are here.
              </p>
            </div>

            <div className="contact-cards-stack">
              {/* Location */}
              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="detail-card-title">Sanctuary Address</h3>
                  <p className="detail-card-val">
                    <strong>EMBER & BEAN</strong><br />
                    123 Coffee Street<br />
                    Nahan, Himachal Pradesh<br />
                    India
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="detail-card-title">Opening Hours</h3>
                  <p className="detail-card-val">
                    <strong>Monday – Friday:</strong> 8:00 AM – 9:30 PM<br />
                    <strong>Saturday – Sunday:</strong> 8:00 AM – 10:30 PM
                  </p>
                </div>
              </div>

              {/* Direct Communication */}
              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="detail-card-title">Direct Inquiries</h3>
                  <p className="detail-card-val">
                    Email: <a href="mailto:hello@emberandbean.com" style={{ color: 'var(--accent-copper)' }}>hello@emberandbean.com</a><br />
                    Phone: <a href="tel:+919876543210" style={{ color: 'var(--text-main)' }}>+91 98765 43210</a><br />
                    Instagram: <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-copper)' }}>@emberandbean</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form & Map Column */}
          <div className="contact-interactive-col">
            {/* Map Visual Placeholder */}
            <div className="map-canvas-container">
              <svg className="map-svg-grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#C88A58" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <div className="map-overlay-badge">
                <div className="map-pin-indicator" />
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>
                  EMBER & BEAN
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>
                  123 Coffee Street, Nahan • HP
                </p>
              </div>
            </div>

            {/* Message Form */}
            <div className="contact-form-box">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Send a Message
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Drop us a note below and our team will get back to you within 24 hours.
              </p>

              {success ? (
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '4px', textAlign: 'center' }}>
                  <CheckCircle2 size={36} color="var(--accent-copper)" style={{ margin: '0 auto 0.8rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    Message Dispatched
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Thank you. We have received your inquiry and will respond shortly.
                  </p>
                  <button
                    className="btn btn-outline"
                    style={{ marginTop: '1.2rem', padding: '0.6rem 1.4rem' }}
                    onClick={() => setSuccess(false)}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem', backgroundColor: '#FDF2F2', border: '1px solid #F87171', borderRadius: '4px', color: '#991B1B', marginBottom: '1.2rem', fontSize: '0.85rem' }}>
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-name">Your Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group-grid" style={{ marginBottom: '1.25rem' }}>
                    <div className="form-field" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="contact-email">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        placeholder="elena@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-subject">Topic / Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Event & Masterclass">Private Event & Masterclass</option>
                      <option value="Wholesale Coffee Beans">Wholesale Coffee Beans</option>
                      <option value="Press & Media">Press & Media</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-msg">Message *</label>
                    <textarea
                      id="contact-msg"
                      name="message"
                      required
                      placeholder="Write your note here..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    {submitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
