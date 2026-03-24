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