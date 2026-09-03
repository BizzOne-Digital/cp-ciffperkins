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
    price: 25,
    amazonUrl: 'https://www.amazon.com',
    featured: true,
    active: true,
    displayOrder: 3,
  },
  {
    name: 'The Soul of a Generation',
    slug: 'the-soul-of-a-generation-cd',
    type: 'cd',
    category: 'Soul',
    shortDescription: 'The soundtrack to a lifetime in music.',
    description:
      'The companion album to Cliff Perkins\' memoir — soulful tracks that carry the same stories and spirit found in the book.',
    price: 12,
    cdBabyUrl: 'https://www.cdbaby.com',
    featured: true,
    active: true,
    displayOrder: 4,
  },
  {
    name: 'Body & Soul Million Dollars',
    slug: 'body-and-soul-million-dollars',
    type: 'cd',
    category: 'Soul',
    shortDescription: 'Timeless soul, recorded with heart.',
    description:
      'A collection of soul recordings from Cliff Perkins celebrating decades of music, performance, and inspiration.',
    price: 12,
    cdBabyUrl: 'https://www.cdbaby.com',
    featured: true,
    active: true,
    displayOrder: 5,
  },
];

const services = [
  {
    title: 'Author & Storyteller',
    description: 'Sharing life stories and lessons through published books for readers of all ages.',
    icon: 'BookOpen',
    displayOrder: 1,
    active: true,
  },
  {
    title: 'Recording Artist',
    description: 'Soulful recordings that capture decades of musical experience and craft.',
    icon: 'Disc3',
    displayOrder: 2,
    active: true,
  },
  {
    title: 'Motivational Speaker',
    description: 'Inspiring audiences with honest, uplifting talks drawn from real experience.',
    icon: 'Mic2',
    displayOrder: 3,
    active: true,
  },
  {
    title: 'Live Performances',
    description: 'Bringing soulful music and energy to concerts, shows, and stages everywhere.',
    icon: 'Music',
    displayOrder: 4,
    active: true,
  },
  {
    title: 'Book Signings',
    description: 'Meeting readers in person to sign copies and share the stories behind the pages.',
    icon: 'PenLine',
    displayOrder: 5,
    active: true,
  },
  {
    title: 'Private Events',
    description: 'Custom performances and appearances tailored to private and corporate gatherings.',
    icon: 'CalendarCheck',
    displayOrder: 6,
    active: true,
  },
  {
    title: 'Music & Book Sales',
    description: 'Books and CDs available for purchase online and at every event.',
    icon: 'ShoppingBag',
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
      "Cliff Perkins has spent a lifetime turning music, ministry, and lived experience into stories that move people. From the stage to the page, his work as an author, recording artist, and speaker continues to inspire audiences of every generation.",
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
