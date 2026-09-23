import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import './GalleryPreviewSection.css';

const previewImages = [
  {
    className: 'item-1',
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    title: 'The Sunlit Brew Bar',
    category: 'Architecture & Interior',
  },
  {
    className: 'item-2',
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    title: 'Morning Dial-In Routine',
    category: 'Barista Craft',
  },
  {
    className: 'item-3',
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    title: 'Laminated Viennoiserie',
    category: 'Bakery',
  },
  {
    className: 'item-4',
    src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
    title: 'Conversations & Steam',
    category: 'Moments',
  },
  {
    className: 'item-5',
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    title: 'Single-Origin Pour Over',
    category: 'Coffee Ritual',
  },
  {
    className: 'item-6',
    src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    title: 'San Sebastián Basque Cake',
    category: 'Desserts',
  },
];

export default function GalleryPreviewSection() {
  return (
    <section className="gallery-preview-section section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="CURATED GLIMPSES"
          title="The Space & Craft"
          description="A visual journal of morning sunlight on travertine stone, hand-pulled espresso crema, and quiet rituals."
          align="split"
          rightContent={
            <Link to="/gallery" className="btn btn-outline" style={{ marginTop: '1rem' }}>
              View Complete Gallery <ArrowUpRight size={16} />
            </Link>
          }
        />

        <div className="gallery-mosaic-grid">
          {previewImages.map((img, idx) => (
            <motion.div
              key={idx}
              className={`gallery-preview-item ${img.className}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="gallery-preview-img"
                loading="lazy"
              />
              <div className="gallery-preview-overlay">
                <span className="gallery-item-category">{img.category}</span>
                <h4 className="gallery-item-title">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
