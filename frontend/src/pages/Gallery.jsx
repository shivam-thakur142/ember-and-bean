import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';

const galleryPhotos = [
  {
    id: 1,
    category: 'coffee',
    categoryLabel: 'Coffee Ritual',
    title: 'The Single-Origin Chemex Pour',
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    category: 'interior',
    categoryLabel: 'Architecture & Interior',
    title: 'Morning Sun Through High Glazing',
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    category: 'barista',
    categoryLabel: 'Barista Craft',
    title: 'Dialing-In Extraction Ratios',
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    category: 'pastries',
    categoryLabel: 'Pastry Craft',
    title: '72-Layer Golden Croissants',
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    category: 'people',
    categoryLabel: 'Patrons & Moments',
    title: 'Slow Conversations Over Flat Whites',
    src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    category: 'architecture',
    categoryLabel: 'Spatial Detail',
    title: 'Local Slate & Deodar Pine Joinery',
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 7,
    category: 'coffee',
    categoryLabel: 'Coffee Ritual',
    title: 'Ristretto Double Pull & Crema',
    src: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 8,
    category: 'pastries',
    categoryLabel: 'Desserts',
    title: 'San Sebastián Basque Burnt Cheesecake',
    src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 9,
    category: 'details',
    categoryLabel: 'Artisan Details',
    title: 'Raw Ceramic Cups & Copper Accents',
    src: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 10,
    category: 'coffee',
    categoryLabel: 'Signature Cold Drip',
    title: '22-Hour Slow Drip Kyoto Tower',
    src: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 11,
    category: 'pastries',
    categoryLabel: 'Pastry Craft',
    title: 'Cardamom Cinnamon Brioche Swirls',
    src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 12,
    category: 'interior',
    categoryLabel: 'Atmosphere',
    title: 'The Reading Alcove at Dusk',
    src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80',
  },
];

const tabs = [
  { id: 'all', label: 'All Photographs' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'interior', label: 'Interior' },
  { id: 'barista', label: 'Barista Craft' },
  { id: 'pastries', label: 'Pastries & Desserts' },
  { id: 'people', label: 'People' },
  { id: 'architecture', label: 'Architecture' },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all');
  const [activePhoto, setActivePhoto] = useState(null);

  const filteredPhotos = activeTab === 'all'
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === activeTab);

  return (
    <div className="gallery-page">
      <div className="container">
        <header className="gallery-hero">
          <span className="eyebrow">VISUAL CHRONICLE</span>
          <h1 className="gallery-page-title">The Gallery</h1>
          <p style={{ maxWidth: '580px', margin: '1rem auto 0', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            A curated photographic documentation of bean provenance, barista concentration, hand-laminated pastry layers, and the patrons who bring warmth to our tables.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="gallery-tabs-row" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`gallery-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry Columns */}
        <motion.div layout className="gallery-masonry">
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="masonry-item"
                onClick={() => setActivePhoto(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="masonry-img"
                  loading="lazy"
                />
                <div className="masonry-overlay">
                  <span className="masonry-category">{photo.categoryLabel}</span>
                  <h4 className="masonry-title">{photo.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setActivePhoto(null)}
              aria-label="Close Lightbox"
            >
              <X size={20} /> Close
            </button>
            <img src={activePhoto.src} alt={activePhoto.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <h3 className="lightbox-title">{activePhoto.title}</h3>
              <p className="lightbox-sub">{activePhoto.categoryLabel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
