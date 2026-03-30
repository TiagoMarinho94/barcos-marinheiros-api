const MarinheirosSrv = require('../services/marinheirosService');

exports.getAllMarinheiros = async function (req, res) {
    try {
        var result = await MarinheirosSrv.getAllMarinheiros();
        if (!result)
            return res.status(404).json({ error: 'Não foram encontrados marinheiros' });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getMarinheirosByID = async function (req,res) {
    try {
        var result = await MarinheirosSrv.getMarinheirosByID(req.params.id);
        if(!result)
            return res.status(404).json({ error: 'Não foram encontrados marinheiros com esse ID' });
        res.json(result);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}
exports.getMarinheirosByClassif = async function (req,res) {
    try {
        var result = await MarinheirosSrv.getMarinheirosByClassif(req.params.classif);
        if(!result)
            return res.status(404).json({ error: 'Não foram encontrados marinheiros com essa classificação'});
        res.json(result);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}
exports.createMarinheiro = async function (req,res) {
    try {
        var result = await MarinheirosSrv.createMarinheiro(req.body.nome,req.body.classif,req.body.idade);
        if(!result)
            return res.status(503).json({ error: 'Erro ao criar marinheiro'});
        res.status(201).json({success: 'Marinheiro criado com sucesso'});
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}
exports.updateMarinheirosByID = async function (req,res) {
    try {
        var result = await MarinheirosSrv.updateMarinheirosByID(req.params.id, req.body.classif);
        if(!result)
            return res.status(404).json({ error: 'Não foram encontrados marinheiros com esse ID'});
        res.sendStatus(204);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}
exports.deleteMarinheiro = async function (req,res) {
    try {
        var result = await MarinheirosSrv.deleteMarinheiro(req.params.id);
        //se marinheiro tem reservas
        if(result === -1)
            return res.status(409).json({ error: 'Marinheiro tem reservas, não é possível apagar'});
        if(!result)
            return res.status(404).json({ error: 'Marinheiro não encontrado' });
        res.sendStatus(204);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}
exports.updateMarinheiro = async function (req, res) {
    try {
        var result = await MarinheirosSrv.updateMarinheiro( req.params.id, req.body.nome, req.body.idade);
        if (!result)
            return res.status(404).json({ error: 'Marinheiro não encontrado' });
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}