import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import './SignatureDrinksSection.css';

const signatureDrinks = [
  {
    eyebrow: 'SIGNATURE CREATION • NO. 01',
    title: 'The Nahan Spanish Latte',
    price: '₹240',
    desc: 'Our flagship beverage. Double-pulled espresso extracted over a bed of house-reduced sweetened organic dairy, finished with micro-foamed farm milk and freshly ground Sri Lankan cinnamon quills.',
    notes: ['Roasted Hazelnut', 'Warm Cinnamon', 'Velvet Caramel'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    reverse: false,
  },
  {
    eyebrow: 'SIGNATURE CREATION • NO. 02',
    title: 'Kyoto 22-Hour Cold Drip',
    price: '₹210',
    desc: 'Slowly extracted drop by drop over ice water inside our custom glass tower. Yields an exceptionally sweet, liqueur-like mouthfeel with complete absence of acidity or bitterness.',
    notes: ['Black Cherry', '70% Dark Cacao', 'Sweet Tobacco'],
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    reverse: true,
  },
  {
    eyebrow: 'SIGNATURE CREATION • NO. 03',
    title: 'Ceremonial Uji Matcha Cloud',
    price: '₹260',
    desc: 'First-harvest ceremonial matcha imported directly from historical gardens in Uji, Kyoto. Hand-whisked with organic oat milk and a whisper of wildflower honey.',
    notes: ['Umami Grassiness', 'Creamy Oat', 'Spring Blossom'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    reverse: false,
  },
];

export default function SignatureDrinksSection() {
  return (
    <section className="signature-drinks-section section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="DISTINCTIVE CRAFTSMANSHIP"
          title="Signature Drinks"
          description="Recipes born from obsessive experimentation. Balanced, memorable, and rooted in the finest botanical and roasted ingredients."
          align="center"
        />

        <div style={{ marginTop: '3rem' }}>
          {signatureDrinks.map((drink, idx) => (
            <motion.div
              key={idx}
              className={`signature-drink-item ${drink.reverse ? 'reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="drink-visual-side">
                <img src={drink.image} alt={drink.title} className="drink-img" />
              </div>

              <div className="drink-info-side">
                <span className="drink-eyebrow">{drink.eyebrow}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
                  <h3 className="drink-title">{drink.title}</h3>
                  <span className="drink-price">{drink.price}</span>
                </div>
                <p className="drink-desc">{drink.desc}</p>
                <div className="drink-tasting-notes">
                  {drink.notes.map((note, nIdx) => (
                    <span key={nIdx} className="tasting-badge">
                      {note}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: '0.8rem' }}>
                  <Link to="/menu?category=coffee" className="btn-link">
                    Order or Learn More <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
