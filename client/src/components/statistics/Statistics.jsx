import { motion } from 'framer-motion';

const stats = [
  {
    id: 1,
    value: '500+',
    label: 'Wedding Shoots',
    subtext: 'Joyous occasions covered'
  },
  {
    id: 2,
    value: '1,000+',
    label: 'Happy Clients',
    subtext: 'Timeless trust built'
  },
  {
    id: 3,
    value: '12+',
    label: 'Years Experience',
    subtext: 'Refining our craft'
  },
  {
    id: 4,
    value: '50+',
    label: 'Awards won',
    subtext: 'Artistic recognition'
  }
];

export default function Statistics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="py-16 md:py-24 bg-dark text-white relative overflow-hidden">
      {/* Decorative Accent Ring */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x-0 lg:divide-x divide-white/10"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="text-center px-4"
            >
              <span className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-accent block mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-white/95 block mb-1">
                {stat.label}
              </span>
              <span className="text-[10px] text-white/40 tracking-wider font-light">
                {stat.subtext}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
