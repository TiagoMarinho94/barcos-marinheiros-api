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