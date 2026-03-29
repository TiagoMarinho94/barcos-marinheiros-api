var express = require('express');
var router = express.Router();
var { celebrate, Joi } = require('celebrate');
const ctr = require('../controllers/reservasController');

router.get('/marinheiro/:id', ctr.getReservasByIDMarinheiro);

router.post('/',
    celebrate({
        body: Joi.object({
            idmarinheiro: Joi.number().min(1).required(),
            idbarco: Joi.number().min(1).required(),
            data: Joi.date().required()
        })
    }),
ctr.createReserva);

router.delete('/:idmarinheiro/:idbarco/:data',
    celebrate({
        params: Joi.object({
            idmarinheiro: Joi.number().min(1).required(),
            idbarco: Joi.number().min(1).required(),
            data: Joi.date().required()
        })
    }),
ctr.deleteReserva);

module.exports = router;