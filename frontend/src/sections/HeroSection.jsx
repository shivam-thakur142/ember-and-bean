import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Coffee, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './HeroSection.css';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized offset from viewport center (-1 to 1)
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-glow-layer" />

      <div className="container-wide">
        <div className="hero-grid">
          {/* Left Column: Editorial Headline & CTAs */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{
              transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -6}px, 0)`,
            }}
          >
            <div className="eyebrow hero-eyebrow">
              SPECIALTY COFFEE • EST. 2018
            </div>

            <h1 className="hero-headline">
              Coffee,
              <br />
              <em>crafted slowly.</em>
            </h1>

            <p className="hero-desc">
              We roast micro-lots with deliberate patience. In an era obsessed with speed, we invite you to pause, savor the aroma of single-origin beans, and celebrate the timeless art of the morning ritual.
            </p>

            <div className="hero-ctas">
              <Link to="/menu" className="btn hero-btn-primary">
                Explore Menu <ArrowUpRight size={16} />
              </Link>
              <Link to="/reservation" className="btn btn-outline-light">
                Reserve a Table
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Layered Visuals, Parallax, Badge */}
          <motion.div
            className="hero-visual-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Subtle Pill Tag */}
            <motion.div
              className="hero-roast-pill"
              style={{
                transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
              }}
            >
              <Sparkles size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-1px' }} />
              Direct Trade Sourcing
            </motion.div>

            {/* Main Visual Frame with Parallax Rotation */}
            <div
              className="hero-image-frame"
              style={{
                transform: `rotateY(${mousePos.x * 6}deg) rotateX(${mousePos.y * -6}deg) translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`,
              }}
            >
              {/* Steam Visual Motif */}
              <div className="hero-steam-motif">
                <span className="steam-line" />
                <span className="steam-line" />
                <span className="steam-line" />
              </div>

              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
                alt="Ember & Bean artisan pour-over coffee bar with morning light"
                className="hero-main-img"
              />
            </div>

            {/* Floating Location Badge */}
            <motion.div
              className="hero-location-badge"
              style={{
                transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -14}px, 0)`,
              }}
            >
              <div className="location-icon-box">
                <MapPin size={18} />
              </div>
              <div>
                <p className="location-meta-title">The Roastery Sanctuary</p>
                <p className="location-meta-sub">Nahan, Himachal Pradesh • India</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
