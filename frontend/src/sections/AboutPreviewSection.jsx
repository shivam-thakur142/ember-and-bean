import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './AboutPreviewSection.css';

export default function AboutPreviewSection() {
  return (
    <section className="about-preview-section section-padding">
      <div className="container">
        <div className="about-preview-grid">
          {/* Layered Photography Left */}
          <motion.div
            className="about-layered-images"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
              alt="Ember & Bean minimalist café interior with warm wooden tables and natural sunlight"
              className="about-img-primary"
            />
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80"
              alt="Barista weighing coffee grinds with precision scales"
              className="about-img-secondary"
            />
          </motion.div>

          {/* Story & Vision Right */}
          <motion.div
            className="about-preview-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="eyebrow">ABOUT THE SPACE</span>
            <h2 className="about-lead">
              A serene haven shaped by timber, stone, and roasted aroma.
            </h2>
            <p className="about-text">
              Founded in 2018 in Nahan, Himachal Pradesh, Ember & Bean was conceived as an intentional antidote to modern hustle. We designed our interior with Scandinavian quietude, Japanese joinery accents, and open mountain views.
            </p>

            <blockquote className="about-quote">
              “Coffee is not merely an energy drink. It is a daily meditation on patience, origin, and warmth.”
            </blockquote>

            <p className="about-text">
              Whether you are discovering our single-origin Ethiopian cold drip or spending an afternoon immersed in a book with a cardamom brioche roll, we ensure every detail respects your peace of mind.
            </p>

            <div style={{ marginTop: '0.5rem' }}>
              <Link to="/about" className="btn btn-outline">
                Read Our Story & Timeline <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
