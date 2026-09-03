const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const { dynamicUpload } = require('../middleware/uploadMiddleware');

router.post('/', protectAdmin, dynamicUpload.single('file'), uploadFile);

module.exports = router;
