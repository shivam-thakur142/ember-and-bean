import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import MenuCard from '../components/MenuCard';
import ItemDetailModal from '../components/ItemDetailModal';
import { getMenu } from '../services/api';
import './FeaturedMenuSection.css';

export default function FeaturedMenuSection() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadFeatured() {
      try {
        setLoading(true);
        const res = await getMenu({ featured: true });
        if (isMounted && res?.data) {
          // Take top 6 featured items
          setFeaturedItems(res.data.slice(0, 6));
        }
      } catch (err) {
        console.warn('Backend menu fetch notice:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFeatured();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="featured-menu-section section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="TASTING SELECTION"
          title="Featured Offerings"
          description="A curated showcase of our most beloved pour-overs, botanical brews, and fresh French pastries baked at sunrise."
          align="split"
          rightContent={
            <Link to="/menu" className="btn btn-outline" style={{ marginTop: '1rem' }}>
              View Full Menu <ArrowUpRight size={16} />
            </Link>
          }
        />

        {loading ? (
          <div className="featured-menu-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="menu-skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="featured-menu-grid">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
              >
                <MenuCard item={item} onClick={() => setSelectedItem(item)} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="featured-menu-footer">
          <Link to="/menu" className="btn btn-primary">
            Explore All 19 Handcrafted Creations <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
