import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ItemDetailModal.css';

export default function ItemDetailModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="item-modal-backdrop" onClick={onClose}>
      <div className="item-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="item-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="item-modal-img-col">
          <img src={item.image} alt={item.name} className="item-modal-img" />
        </div>

        <div className="item-modal-info-col">
          <span className="item-modal-category">{item.category}</span>
          <h2 className="item-modal-title">{item.name}</h2>
          <div className="item-modal-price">₹{item.price}</div>

          <p className="item-modal-desc">{item.description}</p>

          <div className="item-modal-details-grid">
            {item.origin && (
              <div>
                <p className="detail-label">Origin / Estate</p>
                <p className="detail-val">{item.origin}</p>
              </div>
            )}
            {item.brewMethod && (
              <div>
                <p className="detail-label">Extraction / Method</p>
                <p className="detail-val">{item.brewMethod}</p>
              </div>
            )}
            {item.calories && (
              <div>
                <p className="detail-label">Approx. Energy</p>
                <p className="detail-val">{item.calories} kcal</p>
              </div>
            )}
            {item.tags && item.tags.length > 0 && (
              <div>
                <p className="detail-label">Flavor & Notes</p>
                <p className="detail-val">{item.tags.join(' • ')}</p>
              </div>
            )}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
            <Link
              to="/reservation"
              onClick={onClose}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              Reserve a Table <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
