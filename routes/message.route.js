const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

router.post('/send-msg', messageController.sendMessage);

module.exports = router;
