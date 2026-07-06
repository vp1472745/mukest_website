import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const eventTypes = [
    { value: 'wedding', label: 'Wedding Photography' },
    { value: 'pre-wedding', label: 'Pre-Wedding Shoot' },
    { value: 'engagement', label: 'Engagement Ceremony' },
    { value: 'birthday', label: 'Birthday Celebration' },
    { value: 'maternity', label: 'Maternity Shoot' },
    { value: 'baby-shoot', label: 'Baby Shoot' },
    { value: 'fashion', label: 'Fashion / Editorial' },
    { value: 'commercial', label: 'Commercial / Product' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'cinematic', label: 'Cinematic Videography' },
    { value: 'other', label: 'Other Special Shoot' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold block mb-3">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-dark tracking-wide">
            Book Your Session
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Details Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-secondary border border-border-light p-8 md:p-10">
              <h3 className="font-display text-2xl font-light tracking-wide text-dark mb-6">
                LensCraft Studio
              </h3>
              <p className="text-dark/60 text-xs font-light leading-relaxed mb-8">
                Ready to freeze your special moments in time? Drop us an inquiry, let us know your calendar dates, and we’ll sketch a beautiful plan together.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-accent shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-dark/45 block">Phone Inquiry</span>
                    <a href="tel:+1234567890" className="text-sm text-dark font-medium hover:text-accent transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-accent shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-dark/45 block">Email Us</span>
                    <a href="mailto:hello@lenscraftstudio.com" className="text-sm text-dark font-medium hover:text-accent transition-colors">
                      hello@lenscraftstudio.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-accent shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-dark/45 block">Studio Address</span>
                    <address className="text-sm text-dark font-medium not-italic">
                      102, Gold Coast Avenue, Sector 5,<br />Gurugram, Haryana - 122001
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Block Right Column */}
          <div className="lg:col-span-7 relative bg-[#fafafa] border border-border-light p-8 md:p-10">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-semibold text-dark/70">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-white border border-border-light px-4 py-3 text-xs outline-none focus:border-accent transition-all duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-semibold text-dark/70">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="bg-white border border-border-light px-4 py-3 text-xs outline-none focus:border-accent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-[10px] uppercase tracking-widest font-semibold text-dark/70">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (234) 567-890"
                        className="bg-white border border-border-light px-4 py-3 text-xs outline-none focus:border-accent transition-all duration-300"
                      />
                    </div>

                    {/* Event Date */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="eventDate" className="text-[10px] uppercase tracking-widest font-semibold text-dark/70">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="bg-white border border-border-light px-4 py-3 text-xs outline-none focus:border-accent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Event Type */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="eventType" className="text-[10px] uppercase tracking-widest font-semibold text-dark/70">
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="bg-white border border-border-light px-4 py-3 text-xs outline-none focus:border-accent transition-all duration-300"
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-semibold text-dark/70">
                      Message / Special Request
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share details of your request..."
                      className="bg-white border border-border-light px-4 py-3 text-xs outline-none focus:border-accent transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-dark hover:bg-accent text-white flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer disabled:bg-dark/40"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing booking...
                      </>
                    ) : (
                      <>
                        Send Inquiry <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center text-accent mb-6 shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-light text-dark tracking-wide mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-dark/60 text-xs font-light leading-relaxed max-w-sm mb-8">
                    Thank you for reaching out. A booking manager from LensCraft Studio has been notified and will contact you directly within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="border border-dark hover:border-accent hover:bg-accent hover:text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
