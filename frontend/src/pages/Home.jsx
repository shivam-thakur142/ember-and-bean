import React from 'react';
import HeroSection from '../sections/HeroSection';
import IntroSection from '../sections/IntroSection';
import FeaturedMenuSection from '../sections/FeaturedMenuSection';
import AboutPreviewSection from '../sections/AboutPreviewSection';
import CoffeeExperienceSection from '../sections/CoffeeExperienceSection';
import SignatureDrinksSection from '../sections/SignatureDrinksSection';
import GalleryPreviewSection from '../sections/GalleryPreviewSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ReservationCtaSection from '../sections/ReservationCtaSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <FeaturedMenuSection />
      <AboutPreviewSection />
      <CoffeeExperienceSection />
      <SignatureDrinksSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      <ReservationCtaSection />
    </main>
  );
}
