const ReservasSrv = require('../services/reservasService');

exports.getReservasByIDMarinheiro = async function (req, res) {
    try {
        var result = await ReservasSrv.getReservasByIDMarinheiro(req.params.id);
        if (!result)
            return res.status(404).json({ error: 'Não foram encontrados reservas efetuadas por esse marinheiro' });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}