var express = require('express');
var router = express.Router();
var { celebrate, Joi } = require('celebrate');
const ctr = require('../controllers/barcosController');

router.get('/', ctr.getAllBarcos);
router.get('/disponibilidade/:data', ctr.getBarcosDisponibilidade);
router.get('/:id', ctr.getBarcosByID);

router.post('/',
    celebrate({
        body: Joi.object({
            nome: Joi.string().min(2).required(),
            cor: Joi.string().min(1).max(10).required()
        })
    }),
ctr.createBarco);

router.patch('/:id',
    celebrate({
        body: Joi.object({
            nome: Joi.string().min(2).max(50).optional(),
            cor:Joi.string().min(2).max(10).optional()
        })
        .or('nome','cor')
    }),
ctr.updateBarcoByID);

module.exports = router;