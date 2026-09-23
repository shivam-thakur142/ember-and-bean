import React from 'react';
import './SectionHeading.css';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left', // 'left' | 'center' | 'split'
  theme = 'light', // 'light' | 'dark'
  rightContent = null,
}) {
  if (align === 'split') {
    return (
      <div className={`section-heading-wrap split ${theme}`}>
        <div className="heading-left">
          {eyebrow && <span className={`eyebrow ${theme === 'dark' ? 'eyebrow-dark' : ''}`}>{eyebrow}</span>}
          <h2 className="headline-section section-title">{title}</h2>
        </div>
        <div className="heading-right">
          {description && <p className="section-desc">{description}</p>}
          {rightContent}
        </div>
      </div>
    );
  }

  return (
    <div className={`section-heading-wrap ${align} ${theme}`}>
      {eyebrow && <span className={`eyebrow ${theme === 'dark' ? 'eyebrow-dark' : ''}`}>{eyebrow}</span>}
      <h2 className="headline-section section-title">{title}</h2>
      {description && <p className="section-desc" style={align === 'center' ? { maxWidth: '640px', margin: '1rem auto 0' } : {}}>{description}</p>}
      {rightContent}
    </div>
  );
}
