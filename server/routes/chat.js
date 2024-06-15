const express = require('express');

const chatController = require('../controllers/chat.js');

const router = express.Router();

// POST /support/start
router.post('/start', chatController.startChat);

// POST /support/messages/:roomId
router.post('/messages/:roomId', chatController.createMessage);

// GET /support/messages/:roomId
router.get('/messages/:roomId', chatController.getMessages);

// GET /support/sessions
router.get('/sessions', chatController.getSessions);

module.exports = router;
