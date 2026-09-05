require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Service = require('../models/Service');
const SiteContent = require('../models/SiteContent');
const SiteSettings = require('../models/SiteSettings');

const products = [
  {
    name: 'The Soul of a Generation',
    slug: 'the-soul-of-a-generation-book',
    type: 'book',
    category: 'Memoir',
    shortDescription: 'Cliff Perkins reflects on the journey that shaped who he is.',
    description:
      'Music has been an intrinsic part of my journey, shaping who I am. In The Soul of a Generation, Cliff Perkins shares the stories, struggles, and soulful moments behind a lifetime in music and entertainment.',
    price: 25,
    amazonUrl: 'https://www.amazon.com',
    featured: true,
    active: true,
    displayOrder: 1,
  },
  {
    name: 'The Mix of Success',
    slug: 'the-mix-of-success',
    type: 'book',
    category: 'Business',
    shortDescription: 'The business side of a life in music.',
    description:
      'A candid look at what it takes to build and sustain a career in the music business — the deals, the discipline, and the mindset behind lasting success.',
    price: 25,
    amazonUrl: 'https://www.amazon.com',
    featured: true,
    active: true,
    displayOrder: 2,
  },
  {
    name: 'Batter Up!',
    slug: 'batter-up',
    type: 'book',
    category: "Children's",
    shortDescription: 'A Little League story about teamwork, focus, and belief.',
    description:
      'Teamwork. Focus. Listen. Practice. Believe. Batter Up! is a heartfelt Little League story for young readers about showing up and giving your best.',
    price: 12,
    amazonUrl: 'https://www.amazon.com',
    featured: true,
    active: true,
    displayOrder: 3,
  },
  {
    name: 'Beyond Body and Soul',
    slug: 'beyond-body-and-soul',
    type: 'cd',
    category: 'R&B / Soul',
    shortDescription: "Soul Generation's debut album, released in 1973.",
    description:
      "Soul Generation's first album, released in 1973 — the record that carries the group's earliest hits. Not currently for sale.",
    featured: true,
    active: true,
    displayOrder: 4,
  },
  {
    name: 'Soul Generation Feat. Cliff Perkins',
    slug: 'soul-generation-feat-cliff-perkins',
    type: 'cd',
    category: 'R&B / Soul',
    shortDescription: "Soul Generation's latest release.",
    description:
      'The newest album from Soul Generation featuring Cliff Perkins, continuing decades of R&B and soul recordings.',
    price: 12,
    cdBabyUrl: 'https://www.cdbaby.com',
    featured: true,
    active: true,
    displayOrder: 5,
  },
  {
    name: 'Jealous Friends',
    slug: 'jealous-friends',
    type: 'book',
    category: 'Fiction',
    shortDescription: 'A story about envy, loyalty, and the friends who test both.',
    description:
      "Jealous Friends continues the mix once and only twice — a story about the friendships that test loyalty when jealousy creeps in.",
    price: 25,
    amazonUrl: 'https://www.amazon.com',
    featured: false,
    active: true,
    displayOrder: 6,
  },
];

const services = [
  {
    title: 'R&B Tenor Vocalist',
    description: 'Lead vocals with Soul Generation, bringing decades of R&B and soul recordings to the stage.',
    icon: 'mic',
    displayOrder: 1,
    active: true,
  },
  {
    title: 'Choreographer',
    description: 'Stage choreography and performance direction for Soul Generation\'s live shows.',
    icon: 'workshop',
    displayOrder: 2,
    active: true,
  },
  {
    title: 'Author & Storyteller',
    description: 'Sharing life stories and lessons through published books for readers of all ages.',
    icon: 'book',
    displayOrder: 3,
    active: true,
  },
  {
    title: 'Booking Agent & Manager',
    description: 'Manager, organizer, and booking agent for Soul Generation — handling every engagement end to end.',
    icon: 'booking',
    displayOrder: 4,
    active: true,
  },
  {
    title: 'Record Label & Publisher',
    description: 'Owner and publisher of Soul Generation\'s catalog, from Beyond Body and Soul to today.',
    icon: 'award',
    displayOrder: 5,
    active: true,
  },
  {
    title: 'Live Performances',
    description: 'Bringing soulful R&B music and energy to concerts, shows, and stages everywhere.',
    icon: 'concert',
    displayOrder: 6,
    active: true,
  },
  {
    title: 'Music & Book Sales',
    description: 'Books and CDs available for purchase online and at every event.',
    icon: 'star',
    displayOrder: 7,
    active: true,
  },
];

const content = {
  hero: {
    eyebrow: 'THIS IS A GREAT PLACE TO BE!',
    title: 'Cliff Perkins',
    subtitle: 'Author. Musician. Inspiration.',
    description: 'Sharing stories, songs, and soulful experiences that inspire generations.',
    quote: 'Music has been an intrinsic part of my journey, shaping who I am.',
    signature: 'Cliff Perkins',
  },
  stats: [
    { label: '40+ Years of Experience', value: '40+' },
    { label: 'Multiple Published Books', value: '5+' },
    { label: 'Live Performances', value: '100s' },
    { label: 'Stories Across Generations', value: '∞' },
  ],
  about: {
    eyebrow: 'MEET CLIFF PERKINS',
    heading: 'A Voice, A Story, A Legacy.',
    body:
      "Cliff Perkins is an R&B tenor singer and choreographer, and the founder, manager, and organizer of Soul Generation — where he has also served as business manager, record company owner, publisher, and booking agent for the group. From the stage to the page, his work as a performer and author continues to inspire audiences of every generation.",
  },
  footer: {
    tagline: 'Author. Musician. Inspiration.',
    quote: 'Thank you for supporting independent music and stories that touch the soul.',
    copyright: '© 2026 Cliff Perkins. All Rights Reserved.',
    madeWith: 'Made with Soul.',
  },
  finalCta: {
    heading: 'Bring Soul, Story & Inspiration to Your Next Event',
    description: 'Looking for inspiration, music, or an unforgettable experience? Let\'s make it happen.',
  },
};

const settings = {
  businessName: 'Cliff Perkins',
  email: 'soulg192@aol.com',
  phone: '201-920-1021',
  amazonStoreUrl: 'https://www.amazon.com',
  cdBabyUrl: 'https://www.cdbaby.com',
  seo: {
    siteTitle: 'Cliff Perkins — Author. Musician. Inspiration.',
    metaDescription:
      'Cliff Perkins is an author, musician, and speaker sharing stories, songs, and soulful experiences that inspire generations. Shop books, buy CDs, and book Cliff for your next event.',
    keywords: 'Cliff Perkins, author, musician, soul music, books, CDs, motivational speaker, live performances, book cliff',
  },
};

const run = async () => {
  await connectDB();

  try {
    for (const p of products) {
      await Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log(`Seeded ${products.length} products.`);

    for (const s of services) {
      await Service.findOneAndUpdate({ title: s.title }, s, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log(`Seeded ${services.length} services.`);

    for (const [key, data] of Object.entries(content)) {
      await SiteContent.upsert(key, data);
    }
    console.log(`Seeded ${Object.keys(content).length} content blocks.`);

    const existingSettings = await SiteSettings.findOne();
    if (existingSettings) {
      Object.assign(existingSettings, settings, { seo: { ...existingSettings.seo, ...settings.seo } });
      await existingSettings.save();
    } else {
      await SiteSettings.create(settings);
    }
    console.log('Seeded site settings.');

    console.log('Seed data complete.');
  } catch (error) {
    console.error('Seed data error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
