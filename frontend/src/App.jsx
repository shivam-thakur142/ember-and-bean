import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GrainOverlay from './components/GrainOverlay';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Experience from './pages/Experience';
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { ArrowLeft } from 'lucide-react';

// Scroll Restoration on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Editorial 404 Page
function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '6rem 1.5rem 3rem' }}>
      <span className="eyebrow" style={{ justifyContent: 'center' }}>ERROR 404</span>
      <h1 className="headline-section" style={{ margin: '0.8rem 0 1rem' }}>
        The cup is empty.
      </h1>
      <p style={{ maxWidth: '440px', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
        The page you are looking for has moved, or has vanished like the steam off a morning brew.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={16} /> Return to Sanity & Coffee
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <GrainOverlay />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
