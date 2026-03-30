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
exports.createReserva = async function (req,res) {
    try {
        var result = await ReservasSrv.createReserva(req.body.idmarinheiro,req.body.idbarco,req.body.data);
        //verificar se marinheiro existe
        if(result === -1)
            return res.status(404).json({ error: 'Marinheiro não existe'});
        //verificar se barco existe
        if(result === -2)
            return res.status(404).json({ error: 'Barco não existe'});
        //verificar se marinheiro não tem reserva nessa data
        if(result === -3)
            return res.status(404).json({ error: 'Marinheiro já tem reserva nessa data'});
        //verificar se barco não tem reserva nessa data
        if(result === -4)
            return res.status(404).json({ error: 'Barco já tem reserva nessa data'});
        if(!result)
            return res.status(503).json({ error: 'Erro ao criar reserva'});
        res.status(201).json({success: 'Reserva criada com sucesso'});
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}
exports.deleteReserva = async function (req,res) {
    try {
        var result = await ReservasSrv.deleteReserva(req.params.idmarinheiro,req.params.idbarco,req.params.data);
        //verificar se conseguiu apagar a reserva
        if(result === -1)
            return res.status(404).json({ error: 'Não é possível apagar reservas passadas ou reserva não encontrada'});
        if(!result)
            return res.status(503).json({ error: 'Erro ao apagar reserva'});
        res.sendStatus(204);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}
exports.getAllReservas = async function (req, res) {
    try {
        var result = await ReservasSrv.getAllReservas();
        if (!result)
            return res.status(404).json({ error: 'Não existem reservas' });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}