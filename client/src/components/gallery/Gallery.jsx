import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/categories';
import { galleryItems } from '../../data/gallery';
import { X, MapPin, Calendar, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function Gallery({ selectedCategory, setSelectedCategory }) {
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [modalIndex, setModalIndex] = useState(null);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  const openModal = (id) => {
    const idx = galleryItems.findIndex(item => item.id === id);
    setModalIndex(idx);
  };

  const closeModal = () => {
    setModalIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex(prev => (prev === 0 ? galleryItems.length - 1 : prev - 1));
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex(prev => (prev === galleryItems.length - 1 ? 0 : prev + 1));
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalIndex === null) return;
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex]);

  const activeModalItem = modalIndex !== null ? galleryItems[modalIndex] : null;

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Featured Gallery
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-border-light pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 font-semibold cursor-pointer ${
                selectedCategory === cat.id
                  ? 'text-accent border-b-2 border-accent pb-2'
                  : 'text-dark/60 hover:text-accent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden bg-secondary aspect-[4/3] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => openModal(item.id)}
              >
                {/* Photo */}
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover gallery-img-zoom"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-accent uppercase tracking-widest text-[10px] font-semibold mb-1 block">
                      {categories.find(c => c.id === item.category)?.name}
                    </span>
                    <h3 className="text-white font-display text-lg font-light tracking-wide mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-white/70 text-xs font-light mb-3">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/20">
                      <span className="text-[10px] text-white/50 tracking-wider flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
          >
            {/* Header: Logo & Close */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="font-display text-white text-lg tracking-widest">
                LENSCRAFT<span className="text-accent">.</span>
              </span>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slider Main Viewport */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto w-full my-4">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="hidden md:flex w-12 h-12 rounded-full bg-white/5 hover:bg-accent hover:text-white text-white/70 items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Content Area */}
              <div className="w-full flex-1 flex flex-col lg:flex-row items-center bg-[#111111]/80 border border-white/10 max-h-[80vh] overflow-y-auto lg:overflow-hidden rounded-xs">
                {/* Image */}
                <div
                  className="w-full lg:w-3/5 flex items-center justify-center bg-black overflow-hidden relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={activeModalItem.url}
                    alt={activeModalItem.title}
                    className="max-w-full max-h-[70vh] object-contain hover:scale-102 transition-transform duration-700"
                  />

                  {/* Mobile Navigation Arrows */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 md:hidden">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Meta Description */}
                <div
                  className="w-full lg:w-2/5 p-8 text-left flex flex-col justify-between min-h-[300px] lg:min-h-full bg-[#111111] text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <span className="text-accent uppercase tracking-widest text-xs font-semibold block mb-2">
                      {categories.find(c => c.id === activeModalItem.category)?.name}
                    </span>
                    <h3 className="font-display text-2xl font-light tracking-wide mb-4">
                      {activeModalItem.title}
                    </h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      {activeModalItem.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{activeModalItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{activeModalItem.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="hidden md:flex w-12 h-12 rounded-full bg-white/5 hover:bg-accent hover:text-white text-white/70 items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Pagination/Status counter */}
            <div className="text-center text-white/40 text-xs tracking-widest pb-2">
              {modalIndex + 1} / {galleryItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
