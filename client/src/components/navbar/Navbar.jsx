import { useState, useEffect } from 'react';
import { Menu, X, Camera } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Categories', href: '#categories' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    // { name: 'Packages', href: '#packages' },
    // { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-4 border-b border-border-light shadow-xs'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, '#home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <Camera className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-display text-xl md:text-2xl font-semibold tracking-wider text-dark">
            LENSCRAFT<span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-xs uppercase tracking-widest text-dark/75 hover:text-accent font-semibold transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="bg-dark hover:bg-accent text-white hover:text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:shadow-md cursor-pointer"
          >
            Book Session
          </a> */}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-dark focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border-light py-6 px-8 flex flex-col gap-4 shadow-lg animate-fadeIn">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="text-sm uppercase tracking-widest text-dark hover:text-accent font-semibold py-2 transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="bg-dark hover:bg-accent text-white text-center py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 mt-2"
          >
            Book Session
          </a>
        </div>
      )}
    </nav>
  );
}
