const marinheirosRepository = require('../repositories/marinheirosRepository');

exports.getAllMarinheiros = async function () {
    const result = await marinheirosRepository.getAllMarinheiros();
    if (!result || result.length === 0) return null;
    return result;
}