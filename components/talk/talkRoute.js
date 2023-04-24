const express = require('express');
const router = express.Router();
const talkController = require('./talkController');

router.post('/add', talkController.add);
router.get('/find',talkController.find);
router.post('/test',talkController.test);


module.exports = router;