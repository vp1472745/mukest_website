import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import { Users, Camera, Zap, Sliders, BookOpen, Heart } from 'lucide-react';

const iconsMap = {
  Users,
  Camera,
  Zap,
  Sliders,
  BookOpen,
  Heart
};

export default function WhyChooseUs() {
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandards = async () => {
      try {
        const res = await api.section.getAll('standard');
        const activeStandards = (res.data.data || []).filter(s => s.active);
        setReasons(activeStandards);
      } catch (err) {
        console.error('Error fetching standards:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStandards();
  }, []);

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

  if (loading || reasons.length === 0) return null;

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
            const Icon = iconsMap[reason.icon] || Heart;
            return (
              <motion.div
                key={reason._id}
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
