import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenReservation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${
          isHomePage && !isScrolled ? 'hero-mode' : ''
        }`}
      >
        <div className="container-wide navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand">
            <span className="brand-title">EMBER & BEAN</span>
            <span className="brand-subtitle">Specialty Coffee • Est. 2018</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action */}
          <div className="nav-actions">
            <Link
              to="/reservation"
              className="btn btn-outline nav-reserve-btn"
            >
              Reserve Table
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/admin"
              className="mobile-nav-link"
              style={{ fontSize: '1.2rem', color: 'var(--text-light-subtle)' }}
            >
              Admin Portal
            </NavLink>
          </li>
        </ul>

        <div className="mobile-drawer-footer">
          <Link
            to="/reservation"
            className="btn btn-copper"
            style={{ width: '100%' }}
          >
            Reserve a Table <ArrowUpRight size={16} />
          </Link>
          <div className="mobile-drawer-info">
            <p style={{ color: 'var(--text-light-muted)' }}>123 Coffee Street, Nahan, HP</p>
            <p style={{ color: 'var(--text-light-subtle)' }}>Mon–Sun: 8:00 AM – 10:30 PM</p>
          </div>
        </div>
      </div>
    </>
  );
}
