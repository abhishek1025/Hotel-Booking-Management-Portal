import ContactUs from '../components/landing-page/ContactUs';
import Hero from '../components/landing-page/Hero';
import OurServices from '../components/landing-page/OurServices';
import RoomSection from '../components/landing-page/RoomSection';
import Testimonials from '../components/landing-page/Testimonials';
import { SectionGap } from '../ui/SectionGap';

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
