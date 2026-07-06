import { motion } from 'framer-motion';
import { services } from '../../data/services';
import { Heart, Camera, Video, Plane, Image, BookOpen, Sliders, Tv } from 'lucide-react';

const iconsMap = {
  Heart,
  Camera,
  Video,
  Plane,
  Image,
  BookOpen,
  Sliders,
  Tv
};

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Services We Provide
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => {
            const Icon = iconsMap[service.icon] || Camera;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 12px 20px -8px rgba(200, 155, 60, 0.15)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-secondary border border-border-light p-8 group hover:bg-white hover:border-accent flex flex-col items-start min-h-[280px] transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-white group-hover:bg-accent/10 border border-border-light group-hover:border-accent/20 rounded-full flex items-center justify-center text-accent transition-all duration-300 mb-6 shadow-xs">
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-display text-xl font-light text-dark tracking-wide mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-dark/60 text-xs font-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
