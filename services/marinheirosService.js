const marinheirosRepository = require('../repositories/marinheirosRepository');
const reservasRepository = require('../repositories/reservasRepository');

exports.getAllMarinheiros = async function () {
    const result = await marinheirosRepository.getAllMarinheiros();
    if (!result || result.length === 0)
        return null;
    return result;
}
exports.getMarinheirosByID = async function (id) {
    const result = await marinheirosRepository.getMarinheirosByID(id);
    if (!result)
        return null;
    return result;
}
exports.getMarinheirosByClassif = async function (classif) {
    const result = await marinheirosRepository.getMarinheirosByClassif(classif);
    if (!result || result.length === 0)
        return null;
    return result;
}
exports.createMarinheiro = async function (_nome, _classif, _idade) {
    const result = await marinheirosRepository.createMarinheiro(_nome, _classif, _idade);
    if (!result || result === 0)
        return null;
    return result;
}
exports.updateMarinheirosByID = async function (id,_classif) {
    const result = await marinheirosRepository.updateMarinheirosByID(id,_classif);
    if (!result || result === 0)
        return null;
    return result;
}
exports.deleteMarinheiro = async function (_idmarinheiro) {
    //procurar se marinheiro tem reservas
    const reserva = await reservasRepository.getReservasByIDMarinheiro(_idmarinheiro)
    if (reserva && reserva.length > 0)
        return -1; // se tiver dá -1 para saber que nao posso apagar
    //Se nao tiver nenhuma reserva, posso apagar
    const result = await marinheirosRepository.deleteMarinheiro(_idmarinheiro);
    if (!result)
        return null;
    return result;
}