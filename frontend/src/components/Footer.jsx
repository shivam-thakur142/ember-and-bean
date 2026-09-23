import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-top">
          {/* Brand info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              EMBER & BEAN
            </Link>
            <p className="footer-tagline">“Slow mornings. Bold coffee.”</p>
            <p className="footer-desc">
              An architectural coffee sanctuary dedicated to micro-batch roasting, single-origin varietals, and the timeless art of unhurried morning rituals.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{ color: 'var(--accent-copper)' }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:hello@emberandbean.com"
                aria-label="Email Us"
                style={{ color: 'var(--accent-copper)' }}
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+919876543210"
                aria-label="Call Us"
                style={{ color: 'var(--accent-copper)' }}
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/menu" className="footer-link">Specialty Menu</Link></li>
              <li><Link to="/about" className="footer-link">Our Heritage</Link></li>
              <li><Link to="/experience" className="footer-link">The Rituals</Link></li>
              <li><Link to="/gallery" className="footer-link">Visual Gallery</Link></li>
              <li><Link to="/reservation" className="footer-link">Reserve a Table</Link></li>
            </ul>
          </div>

          {/* Hours & Schedule */}
          <div>
            <h4 className="footer-col-title">Hours</h4>
            <div className="footer-info-block">
              <p className="footer-info-label">Monday – Friday</p>
              <p className="footer-info-val">8:00 AM – 9:30 PM</p>
            </div>
            <div className="footer-info-block">
              <p className="footer-info-label">Saturday – Sunday</p>
              <p className="footer-info-val">8:00 AM – 10:30 PM</p>
            </div>
            <div className="footer-info-block" style={{ marginTop: '1rem' }}>
              <p className="footer-info-label">Location</p>
              <p className="footer-info-val">123 Coffee Street, Nahan<br />Himachal Pradesh, India</p>
            </div>
          </div>

          {/* Newsletter / Journal */}
          <div>
            <h4 className="footer-col-title">The Roaster's Dispatch</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-light-muted)', lineHeight: '1.5' }}>
              Subscribe for private cupping invitations, seasonal bean releases, and brew guides.
            </p>

            {subscribed ? (
              <p style={{ color: 'var(--accent-copper)', fontSize: '0.85rem', marginTop: '1rem' }}>
                ✓ Thank you. You are on the dispatch list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input"
                />
                <button type="submit" className="footer-newsletter-btn">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} EMBER & BEAN Specialty Roasters. All rights reserved.
          </p>
          <div className="footer-meta-links">
            <Link to="/admin" className="footer-meta-link">
              Admin Portal
            </Link>
            <Link to="/contact" className="footer-meta-link">
              Contact & Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
