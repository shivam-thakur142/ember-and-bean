import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    time: '08:00 AM — 11:30 AM',
    title: 'The Morning Ritual',
    subtitle: 'Quietude, natural light, and the first pour.',
    desc: 'The best hour at Ember & Bean. The café is bathed in soft eastern Himalayan morning sunlight. The steam from freshly pulled single-origin ristrettos drifts through the room as golden croissants emerge from our ovens. An ideal window for journaling, slow reading, and intentional beginnings.',
    highlights: [
      'Single-Origin Ethiopian Yirgacheffe Pour Overs',
      'Fresh 72-layer Butter Croissants out of the oven at 8:15 AM',
      'Soft instrumental and ambient vinyl selections',
    ],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    reverse: false,
  },
  {
    time: '12:00 PM — 04:30 PM',
    title: 'Afternoon Conversations',
    subtitle: 'Creative sparks, velvety lattes, and relaxed work.',
    desc: 'As midday unfolds, the café gently comes alive with the sound of ideas being exchanged. Designers sketch across deodar pine tables, writers find focus in quiet alcoves, and baristas prepare iced Spanish lattes and cold-drip brews over hand-cut ice.',
    highlights: [
      'Kyoto 22-Hour Slow Drip Cold Brews',
      'Artisan Truffle & Wild Mushroom Croissants',
      'Spacious communal tables with discrete power outlets',
    ],
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=85',
    reverse: true,
  },
  {
    time: '05:00 PM — 08:30 PM',
    title: 'Evening Espresso & Unwind',
    subtitle: 'Golden hour twilight, desserts, and soothing warmth.',
    desc: 'When the mountain peaks turn amber and dusk falls, the café lights soften into warm incandescent tones. Patrons gather for cortados, ceremonial matcha clouds, and slices of Basque burnt cheesecake while sharing the evening with friends.',
    highlights: [
      'San Sebastián Basque Cheesecake with Molten Center',
      'Valrhona Café Mocha with Sea Salt Ganache',
      'Warm ambient lighting and mountain dusk vistas',
    ],
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
    reverse: false,
  },
  {
    time: 'Saturday & Sunday',
    title: 'Weekend Brunch & Tasting Flights',
    subtitle: 'Unhurried feasts, seasonal roasts, and community tables.',
    desc: 'Weekends are dedicated to expansive indulgence. We host guided single-origin cupping flights, special pastry collaborations, and a relaxed brunch menu designed for extended conversations with family and close companions.',
    highlights: [
      'Guided 3-Bean Comparative Origin Cupping Flights',
      'Almond Frangipane & Cardamom Brioche Specials',
      'Prioritized terrace and window seating with reservation',
    ],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
    reverse: true,
  },
];

export default function Experience() {
  return (
    <div className="experience-page">
      <div className="container">
        <header className="experience-hero">
          <span className="eyebrow">RHYTHMS OF THE DAY</span>
          <h1 className="experience-title">
            The Ember & Bean <em>experience.</em>
          </h1>
          <p style={{ maxWidth: '620px', margin: '1.25rem auto 0', fontSize: '1.08rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            From silent sunrise pour overs to warm evening candlelight, every chapter of the day possesses its own distinct sensory atmosphere.
          </p>
        </header>

        <div>
          {experiences.map((exp, idx) => (
            <motion.article
              key={idx}
              className={`ritual-chapter ${exp.reverse ? 'reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="ritual-visual-col">
                <span className="ritual-time-badge">{exp.time}</span>
                <img src={exp.image} alt={exp.title} className="ritual-img" loading="lazy" />
              </div>

              <div className="ritual-text-col">
                <span className="eyebrow">{exp.subtitle}</span>
                <h2 className="ritual-chapter-title">{exp.title}</h2>
                <p className="ritual-chapter-desc">{exp.desc}</p>

                <ul className="ritual-highlights">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="ritual-highlight-item">
                      — {h}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '0.8rem' }}>
                  <Link to="/reservation" className="btn btn-outline">
                    Reserve for this Time <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
