import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Courses from './Courses';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';
import MobileMenu from './MobileMenu';

const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={toggleMobileMenu} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main>
        <Hero />
        <About />
        <Courses />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;