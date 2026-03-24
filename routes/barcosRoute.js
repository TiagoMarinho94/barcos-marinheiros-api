var express = require('express');
var router = express.Router();
var { celebrate, Joi } = require('celebrate');
const ctr = require('../controllers/barcosController');

router.get('/', ctr.getAllBarcos);

module.exports = router;