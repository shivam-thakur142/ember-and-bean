import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './ReservationCtaSection.css';

export default function ReservationCtaSection() {
  return (
    <section className="reservation-cta-section section-padding">
      <div className="reservation-cta-bg-art" />
      <div className="container">
        <motion.div
          className="reservation-cta-wrap"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="eyebrow eyebrow-dark">AN INVITATION TO PAUSE</span>
          <h2 className="cta-headline">Join us at the table.</h2>
          <p className="cta-desc">
            Whether preparing for a slow morning with a journal, hosting an intimate gathering, or pairing fine single-origin pour overs with warm Viennoiserie, we reserve our best tables for you.
          </p>

          <div className="cta-actions">
            <Link to="/reservation" className="btn btn-copper">
              Reserve a Table <ArrowUpRight size={16} />
            </Link>
            <Link to="/menu" className="btn btn-outline-light">
              View Specialty Menu
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
