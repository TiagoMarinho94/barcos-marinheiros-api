const reservasRepository = require('../repositories/reservasRepository');

exports.getReservasByIDMarinheiro = async function (id) {
    const result = await reservasRepository.getReservasByIDMarinheiro(id);
    if (!result || result.length === 0)
        return null;
    return result;
}