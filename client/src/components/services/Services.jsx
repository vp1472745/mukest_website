import { motion } from 'framer-motion';
import { services } from '../../data/services';

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 lg:gap-y-24"
        >
          {services.map((service) => {
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="flex flex-col group"
              >
                {/* Image Container with Hover Zoom */}
                <div className="w-full aspect-[4/5] overflow-hidden shadow-sm">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Overlapping Content Card */}
                <div className="relative -mt-16 mx-auto w-[88%] bg-white p-6 md:p-8 shadow-md border border-border-light text-center flex flex-col items-center justify-center min-h-[180px] z-10 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <h3 className="font-display text-lg md:text-xl font-normal text-accent tracking-wide mb-3">
                    {service.title}
                  </h3>
                  <p className="text-dark/70 text-xs md:text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

