import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import './CoffeeExperienceSection.css';

const pillars = [
  {
    num: '01',
    title: 'Micro-Lot Sourcing',
    desc: 'We partner directly with high-altitude family estates in Chikmagalur, Araku, and Yirgacheffe, ensuring farmers receive 35% above fair-trade commodity standards.',
  },
  {
    num: '02',
    title: 'Precision Roasting',
    desc: 'Each 5kg batch is roasted on our custom cast-iron drum with bespoke convective airflow curves, developing deep sweetness without scorching origin terroir.',
  },
  {
    num: '03',
    title: 'Mineralized Water Bar',
    desc: 'We re-mineralize pure mountain runoff with calibrated calcium and magnesium ions at 120 PPM to highlight delicate floral notes and bright natural acidity.',
  },
  {
    num: '04',
    title: 'Artisan Viennoiserie',
    desc: 'Our bakery operates on a 72-hour cold-fermentation schedule with French cultured butter, producing audibly crisp croissants and delicate tarts daily.',
  },
];

export default function CoffeeExperienceSection() {
  return (
    <section className="coffee-exp-section section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="THE ARCHITECTURE OF TASTE"
          title="The Coffee Experience"
          description="Behind every cup served at Ember & Bean is a rigorous commitment to purity, science, and the tactile poetry of slow extraction."
          theme="dark"
        />

        <div className="coffee-exp-grid">
          {pillars.map((pillar, idx) => (
            <motion.article
              key={idx}
              className="exp-pillar-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.25, 1, 0.5, 1] }}
            >
              <span className="pillar-number">{pillar.num}</span>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
