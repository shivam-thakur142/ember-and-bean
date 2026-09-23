import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, Users, ArrowUpRight, AlertCircle } from 'lucide-react';
import { createReservation } from '../services/api';
import './Reservation.css';

const timeSlots = [
  '08:30 AM',
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '01:30 PM',
  '02:30 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
  '06:30 PM',
  '07:30 PM',
  '08:30 PM',
];

export default function Reservation() {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: todayStr,
    time: '10:30 AM',
    guests: '2',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await createReservation({
        ...formData,
        guests: parseInt(formData.guests, 10),
      });

      if (res?.success && res?.data) {
        setSuccessData(res.data);
      } else {
        throw new Error(res?.message || 'Could not complete reservation.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Reservation submission failed. Please verify connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reservation-page">
      <div className="container">
        {successData ? (
          /* Confirmation Receipt State */
          <motion.div
            className="res-success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="success-badge-icon">
              <CheckCircle2 size={32} />
            </div>

            <span className="eyebrow">RESERVATION REGISTERED</span>
            <h1 className="success-title">We look forward to hosting you.</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '520px', lineHeight: '1.6' }}>
              Your reservation request has been logged. Our host team will ensure your table is prepared with care prior to your arrival.
            </p>

            <div className="success-ref-pill">
              REFERENCE: {successData.bookingReference || 'EB-CONFIRMED'}
            </div>

            <div className="success-details-summary">
              <div>
                <p className="summary-label">Guest</p>
                <p className="summary-val">{successData.name}</p>
              </div>
              <div>
                <p className="summary-label">Party Size</p>
                <p className="summary-val">{successData.guests} Guests</p>
              </div>
              <div>
                <p className="summary-label">Date</p>
                <p className="summary-val">{successData.date}</p>
              </div>
              <div>
                <p className="summary-label">Time Slot</p>
                <p className="summary-val">{successData.time}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSuccessData(null);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: todayStr,
                    time: '10:30 AM',
                    guests: '2',
                    message: '',
                  });
                }}
              >
                Book Another Table
              </button>
              <Link to="/menu" className="btn btn-primary">
                Explore The Menu Ahead <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Standard Booking Layout */
          <div className="reservation-grid">
            {/* Info Side */}
            <div className="res-info-side">
              <span className="eyebrow">AN INTIMATE MORNING OR EVENING</span>
              <h1 className="res-headline">Reserve your table at Ember & Bean.</h1>
              <p className="res-lead">
                We believe dining and coffee are best experienced when space is honored. We preserve generous gaps between tables, curated soundscapes, and personal pour-over tableside brewing.
              </p>

              <div className="res-guidelines-box">
                <span className="guideline-title">Reservation Guidelines</span>
                <ul className="guideline-list">
                  <li className="guideline-item">
                    <span>•</span> Table reservations are held for 15 minutes past the booking time.
                  </li>
                  <li className="guideline-item">
                    <span>•</span> Complimentary chilled spring water and palate cleanser served upon arrival.
                  </li>
                  <li className="guideline-item">
                    <span>•</span> Parties larger than 8 may contact our concierge directly via hello@emberandbean.com.
                  </li>
                  <li className="guideline-item">
                    <span>•</span> Quiet work-friendly alcoves available upon request in the notes.
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Side */}
            <div className="res-form-card">
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem', backgroundColor: '#FDF2F2', border: '1px solid #F87171', borderRadius: '4px', color: '#991B1B', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="form-group-grid">
                  {/* Name */}
                  <div className="form-field full">
                    <label className="form-label" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="aarav@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Date */}
                  <div className="form-field">
                    <label className="form-label" htmlFor="date">
                      Reservation Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      name="date"
                      min={todayStr}
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="form-field">
                    <label className="form-label" htmlFor="time">
                      Preferred Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guests */}
                  <div className="form-field full">
                    <label className="form-label" htmlFor="guests">
                      Number of Guests *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div className="form-field full">
                    <label className="form-label" htmlFor="message">
                      Special Requests / Seating Preference (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="e.g. Quiet window alcove, birthday celebration, dietary allergy notes..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {submitting ? 'Confirming with Host...' : 'Confirm Table Reservation'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
