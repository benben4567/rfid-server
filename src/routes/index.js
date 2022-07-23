const express = require('express');
const router = express.Router();
const scanController = require('../controllers/rfidController');

router.get("/single", scanController.single);

router.get("/multi", scanController.multi);

module.exports = router;