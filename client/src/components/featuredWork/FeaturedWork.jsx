import { motion } from 'framer-motion';

const recentShoots = [
  {
    id: 1,
    title: 'Rahul & Priya Wedding',
    category: 'Wedding',
    location: 'City Palace, Jaipur',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    tag: 'Classic Luxury'
  },
  {
    id: 2,
    title: 'Jaipur Pre-Wedding',
    category: 'Pre-Wedding',
    location: 'Nahargarh Fort, Jaipur',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
    tag: 'Romantic Sunset'
  },
  {
    id: 3,
    title: 'Birthday Celebration',
    category: 'Birthday',
    location: 'Soho Club, Bangalore',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    tag: 'Neon Oasis'
  },
  {
    id: 4,
    title: 'Corporate Summit',
    category: 'Corporate',
    location: 'ITC Grand Chola, Chennai',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    tag: 'Synergy Leadership'
  },
  {
    id: 5,
    title: 'Fashion Shoot',
    category: 'Fashion',
    location: 'Studio 51, Mumbai',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
    tag: 'Vogue Editorial'
  },
  {
    id: 6,
    title: 'Baby Photography',
    category: 'Baby Shoot',
    location: 'Cozy Studio, Delhi',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
    tag: 'Sweet Slumber'
  }
];

export default function FeaturedWork() {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="recent-work" className="py-20 md:py-28 bg-[#fafafa] border-t border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Latest Shoots
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Recent Work
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
          {recentShoots.map((shoot) => (
            <motion.div
              key={shoot.id}
              variants={cardVariants}
              className="bg-white border border-border-light overflow-hidden group hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image box */}
              <div className="overflow-hidden aspect-video relative">
                <img
                  src={shoot.image}
                  alt={shoot.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 text-[9px] uppercase tracking-widest text-dark font-semibold border border-border-light">
                  {shoot.tag}
                </div>
              </div>

              {/* Detail Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-accent text-[10px] uppercase tracking-widest font-semibold block mb-1">
                    {shoot.category}
                  </span>
                  <h3 className="font-display text-lg font-light text-dark tracking-wide mb-2 group-hover:text-accent transition-colors duration-300">
                    {shoot.title}
                  </h3>
                </div>
                <div className="flex justify-between items-center text-xs text-dark/50 border-t border-border-light pt-4 mt-4">
                  <span>{shoot.location}</span>
                  <span className="text-[10px] uppercase tracking-widest text-accent font-semibold group-hover:underline">
                    View Project
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
