import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './About.css';

const timelineEvents = [
  {
    year: '2018',
    title: 'Ember & Bean Begins',
    desc: 'Founded as a quiet four-seat mountain brew bar with a manual lever espresso machine and single-estate Ethiopian beans.',
  },
  {
    year: '2020',
    title: 'First Roasting Partnership',
    desc: 'Commissioned our custom cast-iron drum roaster and secured direct ethical trade agreements with Chikmagalur farms.',
  },
  {
    year: '2023',
    title: 'New Architectural Café',
    desc: 'Unveiled our flagship space in Nahan featuring local slate stone, reclaimed cedar timber, and a dedicated viennoiserie pastry laboratory.',
  },
  {
    year: '2026',
    title: 'Expanding the Experience',
    desc: 'Introducing private cupping masterclasses, rare micro-lot auctions, and seasonal farm-to-table weekend tasting sessions.',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Editorial Hero */}
        <header className="about-hero">
          <span className="eyebrow">OUR HERITAGE & CRAFT</span>
          <h1 className="about-page-title">
            The story behind the <em>ember.</em>
          </h1>
          <p style={{ maxWidth: '620px', margin: '1.25rem auto 0', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            A journey rooted in patience, ethical agronomy, and the belief that morning rituals shape how we experience our lives.
          </p>
        </header>

        {/* Section 1: Our Story */}
        <motion.div
          className="about-narrative-block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="narrative-visual">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
              alt="Barista weighing green coffee beans"
              className="narrative-img"
            />
          </div>
          <div className="narrative-text">
            <span className="eyebrow">ORIGINS • EST. 2018</span>
            <h2 className="narrative-heading">Born from a reverence for the unhurried cup.</h2>
            <p className="narrative-p">
              Ember & Bean began with a simple premise: in a world driven by algorithmic urgency and lukewarm convenience, true luxury is taking time.
            </p>
            <p className="narrative-p">
              Nestled against the pine-draped hillsides of Nahan, we designed a refuge where the sound of hand-cranked grinders, boiling water, and conversation replace the static of daily life.
            </p>
          </div>
        </motion.div>

        {/* Section 2: Our Philosophy (Reverse) */}
        <motion.div
          className="about-narrative-block reverse"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="narrative-visual">
            <img
              src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1000&q=80"
              alt="Pour-over coffee dripping steadily through paper filter"
              className="narrative-img"
            />
          </div>
          <div className="narrative-text">
            <span className="eyebrow">OUR PHILOSOPHY</span>
            <h2 className="narrative-heading">Precision without pretension.</h2>
            <p className="narrative-p">
              We approach coffee as both chemistry and hospitality. We measure brew water minerals to the parts-per-million and calibrate grind micrometers twice daily — not out of snobbery, but out of immense respect for the farmers who tended the soil.
            </p>
            <p className="narrative-p">
              When coffee is treated with tenderness, its hidden character blooms: notes of elderflower, candied citrus, dark praline, and sun-dried figs emerge naturally without syrups or artificial enhancements.
            </p>
          </div>
        </motion.div>

        {/* Section 3: Coffee Sourcing & Roasting */}
        <motion.div
          className="about-narrative-block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="narrative-visual">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80"
              alt="Coffee beans cooling in roasting tray"
              className="narrative-img"
            />
          </div>
          <div className="narrative-text">
            <span className="eyebrow">SOURCING & ROASTING</span>
            <h2 className="narrative-heading">Direct trade from mountain to roast drum.</h2>
            <p className="narrative-p">
              We travel directly to coffee estates in the Western Ghats, Araku Valley, and select Ethiopian regions. We negotiate prices directly with producers, guaranteeing transparent farm-gate pricing that supports biodiversity and equitable wages.
            </p>
            <p className="narrative-p">
              At our roastery, we roast exclusively in small 5-kilogram batches using clean conductive and convective heat to highlight origin characteristics.
            </p>
          </div>
        </motion.div>

        {/* Section 4: The Space */}
        <motion.div
          className="about-narrative-block reverse"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="narrative-visual">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
              alt="Sunlit interior of Ember & Bean with timber and slate stone"
              className="narrative-img"
            />
          </div>
          <div className="narrative-text">
            <span className="eyebrow">THE ARCHITECTURE</span>
            <h2 className="narrative-heading">Warm minimalism inspired by nature.</h2>
            <p className="narrative-p">
              Our space balances Scandinavian restraint with the tactile warmth of the Himalayas. Honed local limestone countertops, oiled deodar pine benches, raw brass fixtures that develop a natural patina over time, and large glazed openings that welcome morning mountain light.
            </p>
            <div style={{ marginTop: '0.8rem' }}>
              <Link to="/experience" className="btn btn-primary">
                Explore The Experience <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Timeline Component */}
        <section className="timeline-section">
          <div className="timeline-header">
            <span className="eyebrow">THE CHRONOLOGY</span>
            <h2 className="headline-section" style={{ marginTop: '0.5rem' }}>
              Our Journey Through Time
            </h2>
          </div>

          <div className="timeline-track">
            {timelineEvents.map((evt, idx) => (
              <motion.div
                key={idx}
                className="timeline-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="timeline-node">
                  <div className="timeline-dot" />
                </div>
                <span className="timeline-year">{evt.year}</span>
                <h3 className="timeline-event-title">{evt.title}</h3>
                <p className="timeline-event-desc">{evt.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
