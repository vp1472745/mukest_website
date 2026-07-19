import { fileURLToPath } from 'url';
import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Hero from '../models/Hero.js';
import Category from '../models/Category.js';
import Gallery from '../models/Gallery.js';
import Service from '../models/Service.js';
import Standard from '../models/Standard.js';
import ProcessModel from '../models/Process.js';
import Testimonial from '../models/Testimonial.js';
import About from '../models/About.js';
import Contact from '../models/Contact.js';
import Seo from '../models/Seo.js';

const seedData = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB Connected for seeding...');
    } else {
      console.log('MongoDB already connected for seeding.');
    }

    // Clear existing data
    await User.deleteMany({});
    await Hero.deleteMany({});
    await Category.deleteMany({});
    await Gallery.deleteMany({});
    await Service.deleteMany({});
    await Standard.deleteMany({});
    await ProcessModel.deleteMany({});
    await Testimonial.deleteMany({});
    await About.deleteMany({});
    await Contact.deleteMany({});
    await Seo.deleteMany({});

    console.log('Cleared existing database records.');

    // 1. Seed Admin User
    const adminUser = await User.create({
      email: 'admin@gmail.com',
      password: 'Admin@123', // Will be hashed automatically by user pre-save hook
      role: 'Admin'
    });
    console.log('Admin user created successfully.');

    // 2. Seed Hero sliders
    const heroes = [
      {
        mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920',
        public_id: 'seed_hero_1',
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
        mediaUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1920',
        public_id: 'seed_hero_2',
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
        mediaUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920',
        public_id: 'seed_hero_3',
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
    ];
    await Hero.insertMany(heroes);
    console.log('Seeded Hero sliders.');

    // 3. Seed Categories
    const categories = [
      {
        icon: 'Heart',
        title: 'Weddings',
        subtitle: 'A Royal Affair',
        description: 'Traditional and destination wedding captures.',
        displayOrder: 1,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_cat_1'
      },
      {
        icon: 'Compass',
        title: 'Pre-Weddings',
        subtitle: 'Love in the Dunes',
        description: 'A romantic couple shoot in ambient lighting.',
        displayOrder: 2,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_cat_2'
      },
      {
        icon: 'Gift',
        title: 'Engagement',
        subtitle: 'Ring Ceremony',
        description: 'Capturing the ring exchange and family joy.',
        displayOrder: 3,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_cat_3'
      },
      {
        icon: 'Flame',
        title: 'Birthdays',
        subtitle: 'Neon Celebrations',
        description: 'Vibrant colors and candid birthday laughs.',
        displayOrder: 4,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_cat_4'
      },
      {
        icon: 'Users',
        title: 'Maternity',
        subtitle: 'Golden Glow',
        description: 'Celebrating motherhood in beautiful natural scenery.',
        displayOrder: 5,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1551980349-75d992b49c86?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_cat_5'
      },
      {
        icon: 'Smile',
        title: 'Baby Shoots',
        subtitle: 'Sweet Slumbers',
        description: 'Adorable fine-art baby portraits with cozy props.',
        displayOrder: 6,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_cat_6'
      },
      {
        icon: 'Film',
        title: 'Film',
        subtitle: 'Cinematic Stories',
        description: 'High-definition wedding films and cinematic recaps.',
        displayOrder: 7,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_cat_7'
      }
    ];
    await Category.insertMany(categories);
    console.log('Seeded Categories.');

    // 4. Seed Gallery items
    const galleries = [
      {
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
        public_id: 'seed_gal_1',
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
        imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200',
        public_id: 'seed_gal_2',
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
        imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
        public_id: 'seed_gal_3',
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
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
        public_id: 'seed_gal_4',
        images: [{ secure_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200', public_id: 'seed_gal_4' }],
        category: 'Film',
        title: 'A Royal Love Story',
        subtitle: 'Cinematic Jodhpur Recap',
        paragraph: 'A premium cinematic wedding film capturing the grand scale and emotional promises of Rohini and Vivek.',
        date: 'Jan 15, 2026',
        location: 'Umaid Bhawan Palace, Jodhpur',
        videoUrl: 'https://www.youtube.com/embed/YdVEuM6dE9M',
        featured: true,
        active: true,
        displayOrder: 4
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1481162854517-d9e353af153d?auto=format&fit=crop&q=80&w=1200',
        public_id: 'seed_gal_5',
        images: [{ secure_url: 'https://images.unsplash.com/photo-1481162854517-d9e353af153d?auto=format&fit=crop&q=80&w=1200', public_id: 'seed_gal_5' }],
        category: 'Film',
        title: 'Sunset Whispers',
        subtitle: 'Pre-Wedding Film',
        paragraph: 'A dreamy cinematic couple shoot capturing sunset playfulness, natural glances, and romance in the sand dunes.',
        date: 'Feb 12, 2026',
        location: 'Sam Sand Dunes, Jaisalmer',
        videoUrl: 'https://www.youtube.com/embed/YdVEuM6dE9M',
        featured: false,
        active: true,
        displayOrder: 5
      }
    ];
    await Gallery.insertMany(galleries);
    console.log('Seeded Gallery items.');

    // 5. Seed Services
    const services = [
      {
        imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_srv_1',
        icon: 'ClipboardList',
        title: 'Complete Wedding Planning',
        subtitle: 'From consultation to farewell',
        paragraph: 'From the first meeting to the final farewell, we handle every detail – décor, logistics, vendors, and coordination – creating a seamless celebration.',
        active: true,
        displayOrder: 1
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_srv_2',
        icon: 'Compass',
        title: 'Theme & Décor Styling',
        subtitle: 'Bespoke design setups',
        paragraph: 'We design breathtaking themes and décor setups – blending creativity, color, and elegance to craft a one-of-a-kind atmosphere.',
        active: true,
        displayOrder: 2
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
        public_id: 'seed_srv_3',
        icon: 'MapPin',
        title: 'Venue Selection & Management',
        subtitle: 'Bespoke location scouting',
        paragraph: 'Our experts help you choose the perfect venue – from luxury hotels to heritage palaces – and manage all arrangements to ensure your event runs smoothly.',
        active: true,
        displayOrder: 3
      }
    ];
    await Service.insertMany(services);
    console.log('Seeded Services.');

    // 6. Seed Standards (Why Choose Us)
    const standards = [
      {
        icon: 'Users',
        title: 'Professional Team',
        description: 'A crew of internationally acclaimed photographers and videographers with sharp technical skills and warm attitudes.',
        displayOrder: 1,
        active: true
      },
      {
        icon: 'Camera',
        title: 'High Resolution Photos',
        description: 'We use state-of-the-art camera systems and high-end lenses to deliver pin-sharp images suitable for massive print sizing.',
        displayOrder: 2,
        active: true
      },
      {
        icon: 'Zap',
        title: 'Fast Delivery',
        description: 'Enjoy a professional sneak peek of your event within 48 hours, followed by full delivery of final edits in under 3 weeks.',
        displayOrder: 3,
        active: true
      }
    ];
    await Standard.insertMany(standards);
    console.log('Seeded Studio Standards.');

    // 7. Seed Processes
    const processes = [
      {
        mediaUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1600',
        public_id: 'seed_prc_1',
        resourceType: 'image',
        stepNumber: 1,
        title: '1. Consultation & Concept',
        subtitle: 'Understanding your style',
        paragraph: 'We start by understanding your dream wedding or event vision – from theme, budget, and décor ideas to location preferences – and create a customized plan.',
        active: true,
        displayOrder: 1
      },
      {
        mediaUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1600',
        public_id: 'seed_prc_2',
        resourceType: 'image',
        stepNumber: 2,
        title: '2. Planning & Coordination',
        subtitle: 'Details and organization',
        paragraph: 'Our team manages everything – venue selection, décor setup, vendor coordination, and timelines – ensuring every detail is flawlessly executed.',
        active: true,
        displayOrder: 2
      },
      {
        mediaUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1600',
        public_id: 'seed_prc_3',
        resourceType: 'image',
        stepNumber: 3,
        title: '3. Execution & Celebration',
        subtitle: 'Smooth event operations',
        paragraph: 'From setup to send-off, we ensure every detail unfolds seamlessly. Our on-ground team manages the timeline and vendor coordination.',
        active: true,
        displayOrder: 3
      }
    ];
    await ProcessModel.insertMany(processes);
    console.log('Seeded Processes.');

    // 8. Seed Testimonials
    const testimonials = [
      {
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        public_id: 'seed_tst_1',
        name: 'Aishwarya & Rohan',
        rating: 5,
        review: 'LensCraft made our dream wedding feel like a fairytale. The photography is simply outstanding, capturing every single tear and laugh with pristine clarity.',
        active: true,
        displayOrder: 1
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        public_id: 'seed_tst_2',
        name: 'Kabir Singh',
        rating: 5,
        review: 'Incredibly professional team! The pre-wedding shoot was handled so smoothly, and we received the full digital gallery within just 2 weeks. Highly recommended!',
        active: true,
        displayOrder: 2
      }
    ];
    await Testimonial.insertMany(testimonials);
    console.log('Seeded Testimonials.');

    // 9. Seed About Page Details
    await About.create({
      bannerUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920',
      banner_public_id: 'seed_abt_banner',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      image_public_id: 'seed_abt_img',
      title: 'Our Creative Philosophy',
      subtitle: 'Capturing and planning stories that last a lifetime',
      paragraph: 'We are LensCraft Studio, a dedicated creative house specializing in luxury wedding planning, bespoke theme decoration, and editorial event coverage. With over a decade of capturing emotional promises and grand celebrations, our goal is to deliver clean aesthetics, flawless timelines, and memories you will cherish forever.',
      active: true
    });
    console.log('Seeded About page content.');

    // 10. Seed Contact Details
    await Contact.create({
      address: '102, Gold Coast Avenue, Sector 5, Gurugram, Haryana - 122001',
      email: 'hello@lenscraftstudio.com',
      phone: '+1 (234) 567-890',
      googleMap: 'https://maps.google.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
      active: true
    });
    console.log('Seeded Contact details.');

    // 11. Seed SEO Global Tags
    await Seo.create({
      page: 'global',
      metaTitle: 'LensCraft Studio | Premium Luxury Weddings & Event Planning',
      metaDescription: 'Discover LensCraft Studio – leading curators of destination weddings, bespoke floral setups, pre-wedding couple styling, and award-winning event photography.',
      keywords: 'wedding planner, destination wedding, wedding photography, luxury event styling, lenscraft'
    });
    console.log('Seeded SEO details.');

    console.log('DB Seeding Completed successfully!');
    if (process.argv[1] === fileURLToPath(import.meta.url)) {
      process.exit(0);
    }
  } catch (error) {
    console.error('DB Seeding Error:', error.message);
    if (process.argv[1] === fileURLToPath(import.meta.url)) {
      process.exit(1);
    }
    throw error;
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedData();
}

export default seedData;
