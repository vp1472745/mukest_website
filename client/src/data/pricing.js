export const pricingPackages = [
  {
    id: 1,
    name: 'Silver Package',
    price: '$1,200',
    duration: '1 Day Shoot',
    description: 'Perfect for intimate gatherings, engagements, or family shoots.',
    features: [
      { text: '1 Lead Photographer', included: true },
      { text: '4 Hours of Active Coverage', included: true },
      { text: '150+ Edited High-Res Photos', included: true },
      { text: 'Online Gallery Delivery (3 Weeks)', included: true },
      { text: 'Standard Printed Album (20 Pages)', included: true },
      { text: 'Cinematic Videography', included: false },
      { text: 'Drone/Aerial Coverage', included: false }
    ],
    isPopular: false,
    badgeText: 'Essential'
  },
  {
    id: 2,
    name: 'Gold Package',
    price: '$2,800',
    duration: '2 Days Shoot',
    description: 'Our most popular option for weddings and pre-wedding celebrations.',
    features: [
      { text: '2 Professional Photographers', included: true },
      { text: 'Full-Day Event Coverage (8 Hours/Day)', included: true },
      { text: '400+ Premium Edited Photos', included: true },
      { text: 'Cinematic Video Teaser (3-5 Mins)', included: true },
      { text: 'Bespoke Premium Album (40 Pages)', included: true },
      { text: 'Drone/Aerial Coverage (1 Session)', included: true },
      { text: 'Online Digital Gallery (2 Weeks)', included: true }
    ],
    isPopular: true,
    badgeText: 'Most Popular'
  },
  {
    id: 3,
    name: 'Platinum Package',
    price: '$4,900',
    duration: 'Multi-Day Event',
    description: 'The ultimate luxury coverage with a full crew and zero compromises.',
    features: [
      { text: '3 Photographers + 2 Videographers', included: true },
      { text: 'Unlimited Coverage of all ceremonies', included: true },
      { text: '800+ Masterfully Retouched Photos', included: true },
      { text: 'Full-Length Cinematic Wedding Film', included: true },
      { text: 'Pre-Wedding Couple Shoot included', included: true },
      { text: 'Dual-Drone 4K Aerial Coverage', included: true },
      { text: '2 Premium Leather-Bound Albums', included: true },
      { text: 'Next-Day Video Teaser Delivery', included: true }
    ],
    isPopular: false,
    badgeText: 'Ultimate Luxury'
  }
];
