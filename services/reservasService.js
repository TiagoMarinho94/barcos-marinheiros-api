const reservasRepository = require('../repositories/reservasRepository');
const ReservasDTO = require('../models/reservas_dto');

exports.getReservasByIDMarinheiro = async function (id) {
    const result = await reservasRepository.getReservasByIDMarinheiro(id);
    if (!result || result.length === 0)
        return null;
    return result.map(item => ReservasDTO.toDetail(item));
}