const express = require('express');
const router = express.Router();
const { getDashboardStats, getDashboard, getCustomers, getEmailLogs } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/adminMiddleware');

router.get('/stats', protectAdmin, getDashboardStats);
router.get('/dashboard', protectAdmin, getDashboard);
router.get('/customers', protectAdmin, getCustomers);
router.get('/email-logs', protectAdmin, getEmailLogs);

module.exports = router;
