const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

router.post('/send-msg', messageController.sendMessage);
router.get('/sent-sms/:userId', messageController.fetchSentMessage);
router.get('/receive/:userId', messageController.fetchReceivedMessage);

module.exports = router;
