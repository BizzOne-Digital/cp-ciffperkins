// Vercel serverless entry point. Vercel builds every file under /api as its
// own function — this one simply re-exports the configured Express app, and
// vercel.json rewrites every request into it.
module.exports = require('../server');
