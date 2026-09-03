const mongoose = require('mongoose');

// Cache the connection promise across invocations. This matters on
// serverless platforms (Vercel) where the module can stay warm between
// requests — without caching, every cold/warm invocation would try to open
// a brand new connection.
let connectionPromise = null;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }
  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not set — skipping DB connection.');
    return Promise.resolve(null);
  }

  connectionPromise = mongoose
    .connect(uri)
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return conn.connection;
    })
    .catch((error) => {
      console.error(`MongoDB connection error: ${error.message}`);
      connectionPromise = null; // allow a retry on the next request
      throw error;
    });

  return connectionPromise;
};

module.exports = connectDB;
