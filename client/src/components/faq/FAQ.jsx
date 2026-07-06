import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../../data/faq';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const toggleFaq = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        {/* Accordions List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-border-light transition-all duration-300 hover:border-accent"
              >
                {/* Header/Question */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-dark uppercase">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-secondary text-dark/70 hover:text-accent flex items-center justify-center shrink-0 transition-colors duration-200">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer with Framer Motion Transition */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-border-light/40">
                        <p className="text-dark/75 text-xs md:text-sm font-light leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
