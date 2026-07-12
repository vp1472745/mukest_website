export const initialMockData = {
  auth: {
    user: { email: 'admin@gmail.com', role: 'Admin' },
    token: 'mock-jwt-token-12345'
  },
  hero: [
    {
      _id: 'mock_hero_1',
      mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920',
      public_id: 'mock_hero_1_pub',
      resourceType: 'image',
      title: 'Capturing Beautiful Moments',
      subtitle: 'Creating Timeless Memories',
      paragraph: 'Wedding • Pre-Wedding • Engagements',
      primaryButtonText: 'Book Your Session',
      primaryButtonLink: '#contact',
      secondaryButtonText: 'Explore Gallery',
      secondaryButtonLink: '#gallery',
      sliderOrder: 1,
      active: true
    },
    {
      _id: 'mock_hero_2',
      mediaUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1920',
      public_id: 'mock_hero_2_pub',
      resourceType: 'image',
      title: 'Emotions in Every Frame',
      subtitle: 'Natural Light Storytelling',
      paragraph: 'Maternity • Baby Shoots • Portraits',
      primaryButtonText: 'Book Your Session',
      primaryButtonLink: '#contact',
      secondaryButtonText: 'Explore Gallery',
      secondaryButtonLink: '#gallery',
      sliderOrder: 2,
      active: true
    },
    {
      _id: 'mock_hero_3',
      mediaUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920',
      public_id: 'mock_hero_3_pub',
      resourceType: 'image',
      title: 'Editorial & Commercial Excellence',
      subtitle: 'Elevating Modern Brands',
      paragraph: 'Fashion • Corporate • Products',
      primaryButtonText: 'Book Your Session',
      primaryButtonLink: '#contact',
      secondaryButtonText: 'Explore Gallery',
      secondaryButtonLink: '#gallery',
      sliderOrder: 3,
      active: true
    }
  ],
  category: [
    {
      _id: 'mock_cat_1',
      icon: 'Heart',
      title: 'Weddings',
      subtitle: 'A Royal Affair',
      description: 'Traditional and destination wedding captures.',
      displayOrder: 1,
      active: true,
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: 'mock_cat_2',
      icon: 'Compass',
      title: 'Pre-Weddings',
      subtitle: 'Love in the Dunes',
      description: 'A romantic couple shoot in ambient lighting.',
      displayOrder: 2,
      active: true,
      imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: 'mock_cat_3',
      icon: 'Gift',
      title: 'Engagement',
      subtitle: 'Ring Ceremony',
      description: 'Capturing the ring exchange and family joy.',
      displayOrder: 3,
      active: true,
      imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: 'mock_cat_4',
      icon: 'Flame',
      title: 'Birthdays',
      subtitle: 'Neon Celebrations',
      description: 'Vibrant colors and candid birthday laughs.',
      displayOrder: 4,
      active: true,
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: 'mock_cat_5',
      icon: 'Users',
      title: 'Maternity',
      subtitle: 'Golden Glow',
      description: 'Celebrating motherhood in beautiful natural scenery.',
      displayOrder: 5,
      active: true,
      imageUrl: 'https://images.unsplash.com/photo-1551980349-75d992b49c86?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: 'mock_cat_6',
      icon: 'Smile',
      title: 'Baby Shoots',
      subtitle: 'Sweet Slumbers',
      description: 'Adorable fine-art baby portraits with cozy props.',
      displayOrder: 6,
      active: true,
      imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800'
    }
  ],
  gallery: [
    {
      _id: 'mock_gal_1',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
      images: [{ secure_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200', public_id: 'seed_gal_1' }],
      category: 'Weddings',
      title: 'A Royal Affair',
      subtitle: 'Jodhpur Heritage',
      paragraph: 'An elegant palace wedding displaying rich heritage and emotional moments.',
      date: 'Dec 12, 2025',
      location: 'Umaid Bhawan Palace, Jodhpur',
      featured: true,
      active: true,
      displayOrder: 1
    },
    {
      _id: 'mock_gal_2',
      imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200',
      images: [{ secure_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200', public_id: 'seed_gal_2' }],
      category: 'Pre-Weddings',
      title: 'Love in the Dunes',
      subtitle: 'Sunset Magic',
      paragraph: 'A beautiful romantic pre-wedding shoot capturing the couple amidst golden sand dunes.',
      date: 'Nov 05, 2025',
      location: 'Sam Sand Dunes, Jaisalmer',
      featured: true,
      active: true,
      displayOrder: 2
    },
    {
      _id: 'mock_gal_3',
      imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
      images: [{ secure_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200', public_id: 'seed_gal_3' }],
      category: 'Engagement',
      title: 'The Eternal Promise',
      subtitle: 'Ring Ceremony',
      paragraph: 'A luxurious engagement ring ceremony capture, showcasing delicate details and emotions.',
      date: 'Oct 22, 2025',
      location: 'Taj Falaknuma Palace, Hyderabad',
      featured: false,
      active: true,
      displayOrder: 3
    }
  ],
  service: [
    {
      _id: 'mock_srv_1',
      imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800',
      icon: 'ClipboardList',
      title: 'Complete Wedding Planning',
      subtitle: 'From consultation to farewell',
      paragraph: 'From the first meeting to the final farewell, we handle every detail – décor, logistics, vendors, and coordination – creating a seamless celebration.',
      active: true,
      displayOrder: 1
    },
    {
      _id: 'mock_srv_2',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      icon: 'Compass',
      title: 'Theme & Décor Styling',
      subtitle: 'Bespoke design setups',
      paragraph: 'We design breathtaking themes and décor setups – blending creativity, color, and elegance to craft a one-of-a-kind atmosphere.',
      active: true,
      displayOrder: 2
    },
    {
      _id: 'mock_srv_3',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
      icon: 'MapPin',
      title: 'Venue Selection & Management',
      subtitle: 'Bespoke location scouting',
      paragraph: 'Our experts help you choose the perfect venue – from luxury hotels to heritage palaces – and manage all arrangements to ensure your event runs smoothly.',
      active: true,
      displayOrder: 3
    }
  ],
  standard: [
    {
      _id: 'mock_std_1',
      icon: 'Users',
      title: 'Professional Team',
      description: 'A crew of internationally acclaimed photographers and videographers with sharp technical skills and warm attitudes.',
      displayOrder: 1,
      active: true
    },
    {
      _id: 'mock_std_2',
      icon: 'Camera',
      title: 'High Resolution Photos',
      description: 'We use state-of-the-art camera systems and high-end lenses to deliver pin-sharp images suitable for massive print sizing.',
      displayOrder: 2,
      active: true
    },
    {
      _id: 'mock_std_3',
      icon: 'Zap',
      title: 'Fast Delivery',
      description: 'Enjoy a professional sneak peek of your event within 48 hours, followed by full delivery of final edits in under 3 weeks.',
      displayOrder: 3,
      active: true
    }
  ],
  process: [
    {
      _id: 'mock_prc_1',
      mediaUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1600',
      resourceType: 'image',
      stepNumber: 1,
      title: '1. Consultation & Concept',
      subtitle: 'Understanding your style',
      paragraph: 'We start by understanding your dream wedding or event vision – from theme, budget, and décor ideas to location preferences – and create a customized plan.',
      active: true,
      displayOrder: 1
    },
    {
      _id: 'mock_prc_2',
      mediaUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1600',
      resourceType: 'image',
      stepNumber: 2,
      title: '2. Planning & Coordination',
      subtitle: 'Details and organization',
      paragraph: 'Our team manages everything – venue selection, décor setup, vendor coordination, and timelines – ensuring every detail is flawlessly executed.',
      active: true,
      displayOrder: 2
    },
    {
      _id: 'mock_prc_3',
      mediaUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1600',
      resourceType: 'image',
      stepNumber: 3,
      title: '3. Execution & Celebration',
      subtitle: 'Smooth event operations',
      paragraph: 'From setup to send-off, we ensure every detail unfolds seamlessly. Our on-ground team manages the timeline and vendor coordination.',
      active: true,
      displayOrder: 3
    }
  ],
  testimonial: [
    {
      _id: 'mock_tst_1',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      name: 'Aishwarya & Rohan',
      rating: 5,
      review: 'LensCraft made our dream wedding feel like a fairytale. The photography is simply outstanding, capturing every single tear and laugh with pristine clarity.',
      active: true,
      displayOrder: 1
    },
    {
      _id: 'mock_tst_2',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      name: 'Kabir Singh',
      rating: 5,
      review: 'Incredibly professional team! The pre-wedding shoot was handled so smoothly, and we received the full digital gallery within just 2 weeks. Highly recommended!',
      active: true,
      displayOrder: 2
    }
  ],
  about: {
    bannerUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    title: 'Our Creative Philosophy',
    subtitle: 'Capturing and planning stories that last a lifetime',
    paragraph: 'We are LensCraft Studio, a dedicated creative house specializing in luxury wedding planning, bespoke theme decoration, and editorial event coverage. With over a decade of capturing emotional promises and grand celebrations, our goal is to deliver clean aesthetics, flawless timelines, and memories you will cherish forever.',
    active: true
  },
  contact: {
    address: '102, Gold Coast Avenue, Sector 5, Gurugram, Haryana - 122001',
    email: 'hello@lenscraftstudio.com',
    phone: '+1 (234) 567-890',
    googleMap: 'https://maps.google.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    active: true
  },
  seo: [
    {
      page: 'global',
      metaTitle: 'LensCraft Studio | Premium Luxury Weddings & Event Planning',
      metaDescription: 'Discover LensCraft Studio – leading curators of destination weddings, bespoke floral setups, pre-wedding couple styling, and award-winning event photography.',
      keywords: 'wedding planner, destination wedding, wedding photography, luxury event styling, lenscraft'
    }
  ]
};
