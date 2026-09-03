require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const run = async () => {
  await connectDB();

  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env to seed an admin.');
    process.exit(1);
  }

  try {
    let admin = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() }).select('+password');

    if (admin) {
      admin.name = ADMIN_NAME || admin.name;
      admin.password = ADMIN_PASSWORD; // will be re-hashed by pre-save hook
      await admin.save();
      console.log(`Admin updated: ${admin.email}`);
    } else {
      admin = await Admin.create({
        name: ADMIN_NAME || 'Admin',
        email: ADMIN_EMAIL.toLowerCase(),
        password: ADMIN_PASSWORD,
      });
      console.log(`Admin created: ${admin.email}`);
    }
  } catch (error) {
    console.error('Seed admin error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
