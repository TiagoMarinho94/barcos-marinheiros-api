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