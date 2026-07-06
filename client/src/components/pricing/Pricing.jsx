import { motion } from 'framer-motion';
import { pricingPackages } from '../../data/pricing';
import { Check, X } from 'lucide-react';

export default function Pricing() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="packages" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Investment
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Pricing Packages
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {pricingPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              className={`border p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? 'border-accent shadow-xl bg-secondary scale-102 lg:scale-105 z-10'
                  : 'border-border-light bg-white hover:border-accent hover:shadow-lg'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[9px] uppercase tracking-widest px-4 py-1.5 font-bold shadow-xs">
                  {pkg.badgeText}
                </div>
              )}
              {!pkg.isPopular && pkg.badgeText && (
                <div className="absolute -top-3 left-6 bg-dark text-white text-[8px] uppercase tracking-widest px-3 py-1 font-semibold">
                  {pkg.badgeText}
                </div>
              )}

              <div>
                {/* Header */}
                <div className="text-center pb-6 border-b border-border-light mb-6">
                  <h3 className="font-display text-xl tracking-wide text-dark mb-1">{pkg.name}</h3>
                  <span className="text-xs text-dark/50 tracking-wider block mb-4">{pkg.duration}</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-4xl md:text-5xl font-light text-dark">{pkg.price}</span>
                  </div>
                  <p className="text-dark/60 text-xs font-light mt-4 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-3.5 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-light">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-dark/20 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-dark/80' : 'text-dark/30 line-through'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button CTA */}
              <button
                onClick={() => handleScrollTo('contact')}
                className={`w-full py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  pkg.isPopular
                    ? 'bg-accent hover:bg-accent-hover text-white'
                    : 'bg-dark hover:bg-accent text-white'
                }`}
              >
                Inquire Package
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
