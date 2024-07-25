import React from 'react';
import Hero from '../components/landing-page/Hero';
import OurServices from '../components/landing-page/OurServices';
import { SectionGap } from '../ui/SectionGap';
import Testimonials from '../components/landing-page/Testimonials';
import ContactUs from '../components/landing-page/ContactUs';
import Navbar from '../components/Navbar';
import RoomSection from '../components/landing-page/RoomSection';

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <RoomSection />
      <SectionGap />
      <OurServices />
      <SectionGap />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default LandingPage;
