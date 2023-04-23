const express = require('express');
const router = express.Router();
const talkController = require('./talkController');

router.post('/add', talkController.add);
router.get('/find',talkController.find);


module.exports = router;