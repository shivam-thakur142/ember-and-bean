import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import './TestimonialsSection.css';

const reviews = [
  {
    quote: '“Ember & Bean doesn’t just make coffee; they elevate extraction into high art. The single-origin Yirgacheffe pour-over is quite simply unmatched in Northern India.”',
    author: 'Vikramaditya Roy',
    title: 'Food & Culinary Critic, The Architectural Review',
  },
  {
    quote: '“The interplay between raw granite, Himalayan pine, and the acoustic hum of the roaster makes this space one of the most sublime places to spend a quiet morning.”',
    author: 'Sunaina Mehta',
    title: 'Design Director, Studio Kanso',
  },
  {
    quote: '“Their Basque burnt cheesecake paired with the Spanish cortado is a revelatory pairing. A genuine world-class café hidden in the mountains.”',
    author: 'Rohan Deshmukh',
    title: 'Q-Grader & Coffee Historian',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="CRITICS & PATRONS"
          title="Words on Our Craft"
          description="Voices from coffee enthusiasts, architects, and travelers who have shared slow mornings with us."
          align="center"
        />

        <div className="testimonials-grid">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.25, 1, 0.5, 1] }}
            >
              <span className="testimonial-quote-mark">“</span>
              <p className="testimonial-body">{rev.quote}</p>
              <div className="testimonial-author-block">
                <span className="author-name">{rev.author}</span>
                <span className="author-title">{rev.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
