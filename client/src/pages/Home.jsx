import { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Hero from '../components/hero/Hero';
import Categories from '../components/categories/Categories';
import Gallery from '../components/gallery/Gallery';
import Services from '../components/services/Services';
import WhyChooseUs from '../components/whyChooseUs/WhyChooseUs';
import BookingProcess from '../components/booking/BookingProcess';
import FAQ from '../components/faq/FAQ';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';

export default function Home() {
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

      {/* 7. Booking Timeline Process */}
      <BookingProcess />

      {/* 8. Frequently Asked Questions */}
      <FAQ />

      {/* 9. Book session / Contact form */}
      <Contact />

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
