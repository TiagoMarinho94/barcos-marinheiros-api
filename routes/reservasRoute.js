var express = require('express');
var router = express.Router();
var { celebrate, Joi } = require('celebrate');
const ctr = require('../controllers/reservasController');

router.get('/marinheiro/:id', ctr.getReservasByIDMarinheiro);

module.exports = router;