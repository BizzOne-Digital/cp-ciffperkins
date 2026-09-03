const express = require('express');
const router = express.Router();
const { getDashboardStats, getDashboard, getCustomers } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/adminMiddleware');

router.get('/stats', protectAdmin, getDashboardStats);
router.get('/dashboard', protectAdmin, getDashboard);
router.get('/customers', protectAdmin, getCustomers);

module.exports = router;
