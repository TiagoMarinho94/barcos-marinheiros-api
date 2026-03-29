const reservasRepository = require('../repositories/reservasRepository');
const marinheirosRepository = require('../repositories/marinheirosRepository');
const barcosRepository = require('../repositories/barcosRepository');
const ReservasDTO = require('../models/reservas_dto');

exports.getReservasByIDMarinheiro = async function (_id) {
    const result = await reservasRepository.getReservasByIDMarinheiro(_id);
    if (!result || result.length === 0)
        return null;
    return result.map(item => ReservasDTO.toDetail(item));
}
exports.createReserva = async function (_idmarinheiro, _idbarco, _data) {
    //procurar se marinheiro existe com função que já existe
    const mar = await marinheirosRepository.getMarinheirosByID(_idmarinheiro)
    if (!mar)
        return -1;
    //procurar se barco existe com função que já existe
    const bar = await barcosRepository.getBarcosByID(_idbarco)
    if (!bar)
        return -2;
    //Se ambos existirem posso criar a reserva
    //fiz isto pois como alterar a base de dados não faz parte deste trabalho, assim garante que a logica do negocio
    const result = await reservasRepository.createReserva(_idmarinheiro, _idbarco, _data);
    if (!result || result === 0)
        return null;
    return result;
}
exports.deleteReserva = async function (_idmarinheiro, _idbarco, _data) {
    const result = await reservasRepository.deleteReserva(_idmarinheiro, _idbarco, _data);
    if (result === 0)
        return -1; // não encontrou a reserva ou data já passou
    return result;
}