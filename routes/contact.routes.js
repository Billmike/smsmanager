const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.controller');

router.post('/create', contactController.create_contact);
router.delete('/:userId', contactController.remove_contact)

module.exports = router;
