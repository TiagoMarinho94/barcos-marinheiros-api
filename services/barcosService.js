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