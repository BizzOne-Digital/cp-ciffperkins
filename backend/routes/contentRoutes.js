const express = require('express');
const router = express.Router();
const { getContent, getAllContent, upsertContent } = require('../controllers/contentController');
const { protectAdmin } = require('../middleware/adminMiddleware');

router.get('/', protectAdmin, getAllContent);
router.get('/:key', getContent);
router.put('/:key', protectAdmin, upsertContent);

module.exports = router;
