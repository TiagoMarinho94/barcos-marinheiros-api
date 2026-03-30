const barcosRepository = require('../repositories/barcosRepository');
const reservasRepository = require('../repositories/reservasRepository');

exports.getAllBarcos = async function () {
    const result = await barcosRepository.getAllBarcos();
    if (!result || result.length === 0)
        return null;
    return result;
}
exports.createBarco = async function (_nome, _cor) {
    const result = await barcosRepository.createBarco(_nome, _cor);
    if (!result || result === 0)
        return null;
    return result;
}
exports.getBarcosByID = async function (_id) {
    const result = await barcosRepository.getBarcosByID(_id);
    if (!result)
        return null;
    return result;
}
exports.getBarcosDisponibilidade = async function (_data) {
    const result = await barcosRepository.getBarcosDisponibilidade(_data);
    if (!result || result.length === 0)
        return null;
    return result;
}
exports.updateBarcoByID = async function (id, _nome, _cor) {
    const result = await barcosRepository.updateBarcoByID(id, _nome, _cor);
    if (!result || result === 0)
        return null;
    return result;
}
exports.deleteBarco = async function (_idbarco) {
    //procurar se barco tem reservas
    const reserva = await reservasRepository.getReservasByIDBarco(_idbarco)
    if (reserva && reserva.length > 0)
        return -1; // se tiver dá -1 para saber que nao posso apagar
    //Se nao tiver nenhuma reserva, posso apagar
    const result = await barcosRepository.deleteBarco(_idbarco);
    if (!result)
        return null;
    return result;
}