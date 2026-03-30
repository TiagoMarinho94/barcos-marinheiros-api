const barcosRepository = require('../repositories/barcosRepository');

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