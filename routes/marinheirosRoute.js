var express = require('express');
var router = express.Router();
var { celebrate, Joi } = require('celebrate');
const ctr = require('../controllers/marinheirosController');

router.get('/', ctr.getAllMarinheiros);
router.get('/classificacao/:classif', ctr.getMarinheirosByClassif);
router.get('/:id', ctr.getMarinheirosByID);

router.post('/',
    celebrate({
        body: Joi.object({
            nome: Joi.string().min(2).required(),
            classif: Joi.number().min(1).max(10).required(),
            idade: Joi.number().min(1).required()
        })
    }),
ctr.createMarinheiro);

router.patch('/:id',
    celebrate({
        body: Joi.object({
            classif: Joi.number().min(1).max(10).required()
        })
    }),
ctr.updateMarinheirosByID);

router.delete('/:id',
    celebrate({
        params: Joi.object({
            id: Joi.number().min(1).required()
        })
    }),
ctr.deleteMarinheiro);

module.exports = router;