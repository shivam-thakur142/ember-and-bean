import React from 'react';
import { motion } from 'framer-motion';
import './IntroSection.css';

export default function IntroSection() {
  return (
    <section className="intro-section section-padding">
      <div className="container">
        <div className="intro-grid">
          {/* Large Statement Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="eyebrow" style={{ marginBottom: '1.25rem' }}>
              The Ember & Bean Philosophy
            </span>
            <h2 className="intro-statement">
              “We believe great coffee <em>isn't rushed.</em>”
            </h2>
          </motion.div>

          {/* Supporting Editorial Copy Right */}
          <motion.div
            className="intro-right"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="intro-lead-text">
              Every bean begins months before in shade-grown mountain estates. Hand-picked at peak ripeness, gently washed, and air-dried on raised bamboo beds under morning mist.
            </p>
            <p className="intro-sub-text">
              Inside our roastery, heat meets craft. We listen to the acoustic crack of the beans, monitoring temperature curves degree by degree. When you hold an Ember & Bean cup, you taste the altitude, the soil, and the calm of people who love what they do.
            </p>

            <div className="intro-specs-grid">
              <div>
                <div className="spec-number">93.5°</div>
                <div className="spec-label">Extraction Temp</div>
              </div>
              <div>
                <div className="spec-number">1:16</div>
                <div className="spec-label">Golden Ratio</div>
              </div>
              <div>
                <div className="spec-number">14d</div>
                <div className="spec-label">Peak Degas Window</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
