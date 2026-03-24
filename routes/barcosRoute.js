var express = require('express');
var router = express.Router();
var { celebrate, Joi } = require('celebrate');
const ctr = require('../controllers/barcosController');

router.get('/', ctr.getAllBarcos);

router.post('/',
    celebrate({
        body: Joi.object({
            nome: Joi.string().min(2).required(),
            cor: Joi.string().min(1).required()
        })
    }),
ctr.createBarco);

module.exports = router;