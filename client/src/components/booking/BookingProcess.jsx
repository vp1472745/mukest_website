import { motion } from 'framer-motion';
import { bookingSteps } from '../../data/booking';
import { Compass, ClipboardList, Handshake, CalendarCheck } from 'lucide-react';

const iconsMap = {
  FileSearch: ClipboardList,
  Users: Handshake,
  CalendarCheck: CalendarCheck
};

export default function BookingProcess() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section id="process" className="bg-white overflow-hidden">
      {/* Background Calendar Header Section */}
      <div className="relative w-full h-[320px] md:h-[380px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1600"
          alt="Process Background Calendar"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-dark/65" />
        {/* Header Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#e07a3f] flex items-center justify-center text-white">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <span className="font-display text-white text-xl md:text-2xl font-light tracking-wide">
              Our Process Section
            </span>
          </div>
          <p className="text-white/80 max-w-xl text-xs md:text-sm font-light leading-relaxed">
            Every Event we plan follows a structured yet flexible process designed for transparency and comfort:
          </p>
        </div>
      </div>

      {/* Cards Overlap Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-20 md:-mt-24 z-20 pb-20 md:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {bookingSteps.map((step) => {
            const Icon = iconsMap[step.icon] || ClipboardList;
            const isSpecial = step.id === 2;

            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`flex flex-col p-8 md:p-10 shadow-md hover:shadow-lg transition-all duration-300 border min-h-[340px] ${
                  isSpecial
                    ? 'bg-[#7fa19c] border-transparent text-white'
                    : 'bg-white border-border-light/70 text-dark'
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xs mb-6 shadow-xs ${
                    isSpecial
                      ? 'bg-white text-[#7fa19c]'
                      : 'bg-[#e07a3f] text-white'
                  }`}
                >
                  <Icon className="w-5.5 h-5.5" />
                </div>

                {/* Title */}
                <h3
                  className={`font-display text-lg md:text-xl font-normal tracking-wide mb-4 ${
                    isSpecial ? 'text-white' : 'text-dark'
                  }`}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-xs md:text-sm font-light leading-relaxed ${
                    isSpecial ? 'text-white/85' : 'text-dark/65'
                  }`}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

