import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import {
  Heart, Camera, Gift, Smile, Users, User,
  Flame, Award, Briefcase, Calendar, Compass, Film
} from 'lucide-react';

const iconsMap = {
  Heart,
  Camera,
  Gift,
  Smile,
  Users,
  User,
  Flame,
  Award,
  Briefcase,
  Calendar,
  Compass,
  Film
};

export default function Categories({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.section.getAll('category');
        setCategories((res.data.data || []).filter(c => c.active));
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const handleCategoryClick = (catTitle) => {
    setSelectedCategory(catTitle);
    const element = document.getElementById('gallery');
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
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading || categories.length === 0) return null;

  return (
    <section id="categories" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Photography Categories
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {categories.map((cat) => {
            const IconComponent = iconsMap[cat.icon] || Camera;
            return (
              <motion.div
                key={cat._id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03, boxShadow: '0 12px 20px -8px rgba(200, 155, 60, 0.18)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => handleCategoryClick(cat.title)}
                className="bg-white border border-border-light p-6 text-center cursor-pointer group hover:border-accent flex flex-col items-center justify-center min-h-[160px] transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-secondary group-hover:bg-accent/10 rounded-full flex items-center justify-center text-dark/70 group-hover:text-accent transition-all duration-300 mb-4">
                  <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-dark group-hover:text-accent font-semibold transition-colors duration-300">
                  {cat.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
