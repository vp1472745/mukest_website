import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Categories from './components/categories/Categories';
import Gallery from './components/gallery/Gallery';
import Services from './components/services/Services';
import WhyChooseUs from './components/whyChooseUs/WhyChooseUs';
import Statistics from './components/statistics/Statistics';
import Pricing from './components/pricing/Pricing';
import Testimonials from './components/testimonials/Testimonials';
import BookingProcess from './components/booking/BookingProcess';
import FAQ from './components/faq/FAQ';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="relative min-h-screen bg-white text-dark select-none antialiased">
      {/* 1. Header/Navigation */}
      <Navbar />

      {/* 2. Hero slider */}
      <Hero />

      {/* 3. Photography Categories Overview */}
      <Categories setSelectedCategory={setSelectedCategory} />

      {/* 4. Featured Portfolio Gallery */}
      <Gallery
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 5. Services Provided */}
      <Services />

      {/* 6. Studio Quality / Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Statistics Banner */}
      {/* <Statistics /> */}

      {/* 8. Investment / Pricing Packages */}
      {/* <Pricing /> */}

      {/* 9. Testimonials Carousel */}
      {/* <Testimonials /> */}

      {/* 10. Booking Timeline Process */}
      <BookingProcess />

      {/* 11. Frequently Asked Questions */}
      <FAQ />

      {/* 12. Book session / Contact form */}
      <Contact />

      {/* 13. Footer */}
      <Footer />
    </div>
  );
}

export default App;

