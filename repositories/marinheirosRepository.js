const { OracleDB, dbConfig } = require('../database/barcos-marinheiros-db');

exports.getAllMarinheiros = async function () {
    let lig;
    try {
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT * FROM MARINHEIROS', [], { outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}
exports.getMarinheirosByID = async function (id){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT * FROM MARINHEIROS WHERE ID_MARINHEIRO = :1', [id], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows[0];
    } finally {
        if (lig) await lig.close();
    }
}
exports.getMarinheirosByClassif = async function (classif){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT * FROM MARINHEIROS WHERE CLASSIFICACAO = :1', [classif], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}
exports.createMarinheiro = async function (_nome, _classif, _idade){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('INSERT INTO MARINHEIROS (NOME, CLASSIFICACAO, IDADE) VALUES (:1, :2, :3)', [_nome, _classif, _idade], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}