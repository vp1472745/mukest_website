import { motion } from 'framer-motion';
import { MailOpen, MessageCircle, FileCheck, Camera, Sliders, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Inquiry',
    icon: MailOpen,
    description: 'Fill out our contact inquiry form below with your date, event type, and details. We will check availability and get back within 24 hours.'
  },
  {
    id: 2,
    title: 'Discussion',
    icon: MessageCircle,
    description: 'We host a design consultation (in person or online) to align on your creative vision, moodboards, logistics, and preferred styles.'
  },
  {
    id: 3,
    title: 'Booking Confirmation',
    icon: FileCheck,
    description: 'Secure your date by signing our digital creative agreement and submitting a 30% retainer deposit. Your slot is officially locked!'
  },
  {
    id: 4,
    title: 'Photography Session',
    icon: Camera,
    description: 'The big day! Our professional team captures all key moments and emotions using premium gear, ensuring a relaxed and enjoyable experience.'
  },
  {
    id: 5,
    title: 'Creative Editing',
    icon: Sliders,
    description: 'Our digital laboratory retouches, color-grades, and fine-tunes the selections to make sure every photo matches our signature editorial tone.'
  },
  {
    id: 6,
    title: 'Final Delivery',
    icon: CheckCircle,
    description: 'Access your secure password-protected online viewing gallery within 3 weeks. Custom premium leather albums are delivered directly to your doorstep.'
  }
];

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="process" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Workflow
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Our Booking Process
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        {/* Timeline Path */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative flex flex-col items-center"
        >
          {/* Vertical Connecting Line on Desktop */}
          <div className="absolute top-0 bottom-0 left-[23px] lg:left-1/2 w-[1px] bg-border-light z-0 -translate-x-1/2" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`w-full flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 lg:mb-16 relative z-10 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Left/Right Text Card */}
                <div className="w-full lg:w-[45%] pl-[56px] lg:pl-0 text-left lg:group">
                  <div
                    className={`border border-border-light p-8 bg-[#fafafa] hover:border-accent hover:shadow-lg transition-all duration-300 ${
                      isEven ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <span className="text-accent font-display text-sm tracking-widest block mb-2 font-semibold">
                      Step 0{step.id}
                    </span>
                    <h3 className="font-display text-lg font-light text-dark tracking-wide mb-2">
                      {step.title}
                    </h3>
                    <p className="text-dark/60 text-xs font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Circle Center */}
                <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-border-light hover:border-accent flex items-center justify-center text-dark/70 hover:text-accent shadow-sm z-20 transition-all duration-300">
                  <Icon className="w-5.5 h-5.5" />
                </div>

                {/* Spacer block on desktop */}
                <div className="hidden lg:block lg:w-[45%]" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
