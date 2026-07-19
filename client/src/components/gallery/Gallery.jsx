import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { X, MapPin, Calendar, ChevronLeft, ChevronRight, Eye, Play } from 'lucide-react';

const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtube.com/embed/') || url.includes('player.vimeo.com/')) {
    return url;
  }
  const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const ytMatch = url.match(ytRegExp);
  if (ytMatch && ytMatch[2].length === 11) {
    return `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1`;
  }
  const vimeoRegExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const vimeoMatch = url.match(vimeoRegExp);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }
  return url;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const reg = /^\d{4}-\d{2}-\d{2}$/;
  if (reg.test(dateStr)) {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  }
  return dateStr;
};

export default function Gallery({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [innerImageIndex, setInnerImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, galRes] = await Promise.all([
          api.section.getAll('category'),
          api.section.getAll('gallery')
        ]);
        
        const activeCats = (catsRes.data.data || []).filter(c => c.active);
        const activeGal = (galRes.data.data || []).filter(g => g.active);

        setCategories(activeCats);
        setGalleryItems(activeGal);
        setFilteredItems(activeGal);
      } catch (err) {
        console.error('Error fetching gallery data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, galleryItems]);

  const openModal = (id) => {
    const idx = galleryItems.findIndex(item => item._id === id);
    setModalIndex(idx);
    setInnerImageIndex(0);
  };

  const closeModal = () => {
    setModalIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex(prev => (prev === 0 ? galleryItems.length - 1 : prev - 1));
      setInnerImageIndex(0);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex(prev => (prev === galleryItems.length - 1 ? 0 : prev + 1));
      setInnerImageIndex(0);
    }
  };

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

  if (loading) return null;

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
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 font-semibold cursor-pointer ${
              selectedCategory === 'all'
                ? 'text-accent border-b-2 border-accent pb-2'
                : 'text-dark/60 hover:text-accent'
            }`}
          >
            All Work
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat.title)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 font-semibold cursor-pointer ${
                selectedCategory === cat.title
                  ? 'text-accent border-b-2 border-accent pb-2'
                  : 'text-dark/60 hover:text-accent'
              }`}
            >
              {cat.title}
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
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden bg-secondary aspect-[4/3] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => openModal(item._id)}
              >
                {/* Photo */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover gallery-img-zoom"
                />

                {/* Video Play Indicator Icon */}
                {item.videoUrl && (
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-accent shadow-md backdrop-blur-xs group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-3.5 h-3.5 fill-accent" />
                  </div>
                )}

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-accent uppercase tracking-widest text-[10px] font-semibold mb-1 block">
                      {item.category}
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
                        <Calendar className="w-3 h-3" /> {formatDate(item.date)}
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
                {/* Image or Video Player */}
                <div
                  className="w-full lg:w-3/5 aspect-video flex items-center justify-center bg-black overflow-hidden relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {activeModalItem.videoUrl ? (
                    activeModalItem.videoUrl.includes('youtube.com') ||
                    activeModalItem.videoUrl.includes('youtu.be') ||
                    activeModalItem.videoUrl.includes('vimeo.com') ? (
                      <iframe
                        src={getEmbedUrl(activeModalItem.videoUrl)}
                        title={activeModalItem.title}
                        className="w-full h-full min-h-[40vh] lg:min-h-[60vh] border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={activeModalItem.videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full max-h-[70vh] object-contain"
                      />
                    )
                  ) : (
                    <>
                      <img
                        src={
                          activeModalItem.images && activeModalItem.images.length > 0
                            ? activeModalItem.images[innerImageIndex].secure_url
                            : activeModalItem.imageUrl
                        }
                        alt={activeModalItem.title}
                        className="max-w-full max-h-[70vh] object-contain hover:scale-102 transition-transform duration-700"
                      />

                      {/* Inner Images Sub-navigation Slider */}
                      {activeModalItem.images && activeModalItem.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInnerImageIndex(prev =>
                                prev === 0 ? activeModalItem.images.length - 1 : prev - 1
                              );
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors cursor-pointer border border-white/10 animate-fade-in"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInnerImageIndex(prev =>
                                prev === activeModalItem.images.length - 1 ? 0 : prev + 1
                              );
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors cursor-pointer border border-white/10 animate-fade-in"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          {/* Dots/Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 px-3 py-1 rounded-full border border-white/5">
                            {activeModalItem.images.map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                                  idx === innerImageIndex ? 'bg-accent' : 'bg-white/40'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}

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
                      {activeModalItem.category}
                    </span>
                    <h3 className="font-display text-2xl font-light tracking-wide mb-4">
                      {activeModalItem.title}
                    </h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      {activeModalItem.paragraph || activeModalItem.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{activeModalItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{formatDate(activeModalItem.date)}</span>
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
