import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './MenuCard.css';

export default function MenuCard({ item, onClick }) {
  if (!item) return null;

  return (
    <article className="menu-card" onClick={onClick}>
      <div className="menu-card-img-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="menu-card-img"
          loading="lazy"
        />
        {item.isFeatured && (
          <span className="menu-card-badge">Signature</span>
        )}
        <div className="menu-card-arrow-icon" aria-hidden="true">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{item.name}</h3>
          <span className="menu-card-price">₹{item.price}</span>
        </div>

        <p className="menu-card-desc">{item.description}</p>

        {(item.origin || item.brewMethod || (item.tags && item.tags.length > 0)) && (
          <div className="menu-card-meta">
            {item.origin && <span className="meta-pill">{item.origin}</span>}
            {item.brewMethod && <span className="meta-pill">{item.brewMethod}</span>}
            {item.tags?.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="meta-pill">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
