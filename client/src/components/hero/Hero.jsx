import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { api } from '../../services/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await api.section.getAll('hero');
        // Only show active slides
        const activeSlides = (res.data.data || []).filter(s => s.active);
        setSlides(activeSlides);
      } catch (err) {
        console.error('Error fetching hero slides:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  if (loading || slides.length === 0) {
    return (
      <div className="h-screen w-full bg-dark flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="home" className="relative h-screen w-full bg-dark overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={slides.length > 1}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id} className="relative h-full w-full">
            {/* Background Image/Video with Dark Overlay */}
            <div className="absolute inset-0 transition-transform duration-[8000ms] ease-out scale-105 swiper-slide-active:scale-100">
              {slide.resourceType === 'video' ? (
                <video
                  src={slide.mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.mediaUrl})` }}
                />
              )}
              <div 
                className="absolute inset-0 bg-black" 
                style={{ opacity: slide.backgroundOverlay ?? 0.45 }}
              />
            </div>

            {/* Slide Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-accent uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-3"
              >
                {slide.paragraph}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light tracking-wide max-w-4xl leading-tight mb-4"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-white/80 text-sm md:text-lg lg:text-xl font-light tracking-widest max-w-2xl mb-8 font-display italic"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {slide.primaryButtonText && (
                  <button
                    onClick={() => handleScrollTo(slide.primaryButtonLink?.replace('#', '') || 'contact')}
                    className="bg-accent hover:bg-accent-hover text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    {slide.primaryButtonText}
                  </button>
                )}
                {slide.secondaryButtonText && (
                  <button
                    onClick={() => handleScrollTo(slide.secondaryButtonLink?.replace('#', '') || 'gallery')}
                    className="border border-white hover:border-accent hover:bg-accent text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                  >
                    {slide.secondaryButtonText}
                  </button>
                )}
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
