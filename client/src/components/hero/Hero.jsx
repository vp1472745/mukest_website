import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920',
    title: 'Capturing Beautiful Moments',
    subtitle: 'Creating Timeless Memories',
    tags: 'Wedding • Pre-Wedding • Engagements'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1920',
    title: 'Emotions in Every Frame',
    subtitle: 'Natural Light Storytelling',
    tags: 'Maternity • Baby Shoots • Portraits'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920',
    title: 'Editorial & Commercial Excellence',
    subtitle: 'Elevating Modern Brands',
    tags: 'Fashion • Corporate • Products'
  }
];

export default function Hero() {
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
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Background Image with Dark Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out scale-105 swiper-slide-active:scale-100"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/45" />
            </div>

            {/* Slide Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-accent uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-3"
              >
                {slide.tags}
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
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Book Your Session
                </button>
                <button
                  onClick={() => handleScrollTo('gallery')}
                  className="border border-white hover:border-accent hover:bg-accent text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                >
                  Explore Gallery
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
