import { Camera, Heart } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-dark text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
        {/* About column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Camera className="w-6 h-6 text-accent" />
            <span className="font-display text-xl tracking-wider text-white">
              LENSCRAFT<span className="text-accent">.</span>
            </span>
          </a>
          <p className="text-white/50 text-xs font-light leading-relaxed max-w-sm">
            LensCraft Studio is a boutique creative house specializing in luxury wedding, editorial, and commercial photography. Dedicated to capturing your rawest, most timeless emotions.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-accent hover:text-accent flex items-center justify-center transition-colors text-white/70 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-accent hover:text-accent flex items-center justify-center transition-colors text-white/70 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-accent hover:text-accent flex items-center justify-center transition-colors text-white/70 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z"></path><polygon points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>


        {/* Quick Links */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h4 className="font-display text-sm font-semibold tracking-widest text-accent uppercase">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { name: 'Home', id: '#home' },
              { name: 'Gallery Portfolio', id: '#gallery' },
              { name: 'Services Offered', id: '#services' },
              { name: 'Pricing Packages', id: '#packages' },
              { name: 'Client Reviews', id: '#testimonials' }
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.id}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  className="text-xs text-white/60 hover:text-accent tracking-wider font-light transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="font-display text-sm font-semibold tracking-widest text-accent uppercase">
            Get In Touch
          </h4>
          <ul className="flex flex-col gap-3 text-xs font-light text-white/60">
            <li>
              <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Email</span>
              <a href="mailto:hello@lenscraftstudio.com" className="hover:text-accent text-white/80 transition-colors">
                hello@lenscraftstudio.com
              </a>
            </li>
            <li>
              <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Phone Inquiry</span>
              <a href="tel:+1234567890" className="hover:text-accent text-white/80 transition-colors">
                +1 (234) 567-890
              </a>
            </li>
            <li>
              <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Our Location</span>
              <span className="text-white/80">
                102, Gold Coast Avenue, Gurugram, India
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40 tracking-widest uppercase font-semibold">
        <span>© {new Date().getFullYear()} LensCraft Studio. All Rights Reserved.</span>
        <span className="flex items-center gap-1.5 font-light normal-case tracking-wider">
          Made with <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> for beautiful memories.
        </span>
      </div>
    </footer>
  );
}
