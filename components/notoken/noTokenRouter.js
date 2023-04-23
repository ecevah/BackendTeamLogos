const express = require('express');
const router = express.Router();
const clientController = require('../client/clientController');
const psychologistController = require('../psychologist/psychologistController');
const noTokenController = require('./noTokenController');

router.post(`/client/add`, clientController.dcreate);
router.post(`/psyc/add`, psychologistController.create);
router.post(`/client/login`, clientController.login);
router.post(`/psyc/login`, psychologistController.login);
router.get('/client/reset', clientController.findMail);
router.get('/psyc/reset', psychologistController.findMail);
router.get('/psyc/test', psychologistController.test);
router.get('/mail', noTokenController.mail)
 
module.exports = router;