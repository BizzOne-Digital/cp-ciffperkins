const express = require('express');
const router = express.Router();
const { createContact, getContacts, markContactRead, deleteContact } = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/adminMiddleware');

router.post('/', createContact);
router.get('/', protectAdmin, getContacts);
router.put('/:id/read', protectAdmin, markContactRead);
router.delete('/:id', protectAdmin, deleteContact);

module.exports = router;
