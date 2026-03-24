const barcosRepository = require('../repositories/barcosRepository');

exports.getAllBarcos = async function () {
    const result = await barcosRepository.getAllBarcos();
    if (!result || result.length === 0)
        return null;
    return result;
}