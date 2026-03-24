var express = require('express');
var router = express.Router();
var { celebrate, Joi } = require('celebrate');
const ctr = require('../controllers/marinheirosController');

router.get('/', ctr.getAllMarinheiros);
router.get('/classificacao/:classif', ctr.getMarinheirosByClassif);
router.get('/:id', ctr.getMarinheirosByID);

module.exports = router;