const BarcosSrv = require('../services/barcosService');

exports.getAllBarcos = async function (req, res) {
    try {
        var result = await BarcosSrv.getAllBarcos();
        if (!result)
            return res.status(404).json({ error: 'Não foram encontrados barcos' });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.createBarco = async function (req,res) {
    try {
        var result = await BarcosSrv.createBarco(req.body.nome,req.body.cor);
        if(!result)
            return res.status(503).json({ error: 'Erro ao criar barco'});
        res.status(201).json({success: 'Barco criado com sucesso'});
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}
exports.getBarcosByID = async function (req, res) {
    try {
        var result = await BarcosSrv.getBarcosByID(req.params.id);
        if (!result)
            return res.status(404).json({ error: 'Não foram encontrado nenhum barco com esse ID' });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getBarcosDisponibilidade = async function (req, res) {
    try {
        var result = await BarcosSrv.getBarcosDisponibilidade(req.params.data);
        if (!result)
            return res.status(404).json({ error: 'Não existem barcos diponiveis nesse dia' });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.updateBarcoByID = async function (req,res) {
    try {
        var result = await BarcosSrv.updateBarcoByID(req.params.id,req.body.nome,req.body.cor);
        if(!result)
            return res.status(404).json({ error: 'Barco não encontrado'});
        res.sendStatus(204);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}