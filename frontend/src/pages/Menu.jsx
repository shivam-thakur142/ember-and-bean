import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '../components/MenuCard';
import ItemDetailModal from '../components/ItemDetailModal';
import { getMenu } from '../services/api';
import './Menu.css';

const categories = [
  { id: 'all', label: 'All Offerings' },
  { id: 'coffee', label: 'Specialty Coffee' },
  { id: 'non-coffee', label: 'Botanical & Teas' },
  { id: 'bakery', label: 'Artisan Bakery' },
  { id: 'desserts', label: 'Desserts & Sweets' },
];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [errorNotice, setErrorNotice] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMenuCatalog() {
      try {
        setLoading(true);
        setErrorNotice(null);
        const res = await getMenu({
          category: activeCategory,
          search: searchQuery,
        });

        if (isMounted && res?.data) {
          setItems(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setErrorNotice('Could not reach backend menu API. Showing offline items if available.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timer = setTimeout(fetchMenuCatalog, 180);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  return (
    <div className="menu-page">
      <div className="container">
        {/* Page Hero Header */}
        <header className="menu-hero-header">
          <span className="eyebrow">OUR ROASTER'S CATALOG</span>
          <h1 className="menu-page-title">The Seasonal Menu</h1>
          <p className="menu-page-desc">
            Single-origin coffees roasted in micro-lots, botanical cold brews, and French viennoiserie baked fresh hourly in our stone ovens.
          </p>
        </header>

        {/* Control Bar: Categories & Search */}
        <div className="menu-controls-bar">
          <div className="category-tabs" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="menu-search-box">
            <Search size={16} color="var(--text-subtle)" />
            <input
              type="text"
              placeholder="Search coffee, pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
            />
          </div>
        </div>

        {errorNotice && (
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderLeft: '3px solid var(--accent-copper)', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{errorNotice}</p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="menu-catalog-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="menu-skeleton-card" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="menu-empty-state">
            <h3 className="empty-title">No menu items found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              We could not find anything matching "{searchQuery}" in this category.
            </p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="menu-catalog-grid">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  <MenuCard item={item} onClick={() => setSelectedItem(item)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
