import { motion } from 'framer-motion';
import { Users, Camera, Zap, Sliders, BookOpen, Heart } from 'lucide-react';

const reasons = [
  {
    id: 1,
    title: 'Professional Team',
    icon: Users,
    description: 'A crew of internationally acclaimed photographers and videographers with sharp technical skills and warm attitudes.'
  },
  {
    id: 2,
    title: 'High Resolution Photos',
    icon: Camera,
    description: 'We use state-of-the-art camera systems and high-end lenses to deliver pin-sharp images suitable for massive print sizing.'
  },
  {
    id: 3,
    title: 'Fast Delivery',
    icon: Zap,
    description: 'Enjoy a professional sneak peek of your event within 48 hours, followed by full delivery of final edits in under 3 weeks.'
  },
  {
    id: 4,
    title: 'Creative Editing',
    icon: Sliders,
    description: 'Bespoke custom color grading, mood alignment, and fine-art skin retouching tailored uniquely to each project’s feel.'
  },
  {
    id: 5,
    title: 'Premium Albums',
    icon: BookOpen,
    description: 'We curate and design gorgeous, heavyweight flush-mount albums wrapped in handpicked silk, velvet, or Italian leather.'
  },
  {
    id: 6,
    title: 'Affordable Packages',
    icon: Heart,
    description: 'Premium service structured into clear, transparent, and custom-tailored package levels with absolutely zero hidden fees.'
  }
];

export default function WhyChooseUs() {
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
    <section id="why-us" className="py-20 md:py-28 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Our Studio Standard
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.id}
                variants={cardVariants}
                className="bg-[#fcfcfc] border border-border-light p-8 group hover:bg-[#fafafa] hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-white group-hover:bg-accent/10 border border-border-light group-hover:border-accent/20 rounded-full flex items-center justify-center text-accent shrink-0 transition-all duration-300 shadow-xs">
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-light text-dark tracking-wide mb-2 group-hover:text-accent transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-dark/60 text-xs font-light leading-relaxed">
                    {reason.description}
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
