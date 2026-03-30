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
        //procurar o maior ID existente
        const maxId = await lig.execute('SELECT NVL(MAX(ID_MARINHEIRO),0) + 1 AS NOVO_ID FROM MARINHEIROS', [], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        const novoId = maxId.rows[0].NOVO_ID;
        //inserir agora os novos dados na tabela
        const result = await lig.execute('INSERT INTO MARINHEIROS (ID_MARINHEIRO, NOME, CLASSIFICACAO, IDADE) VALUES (:1, :2, :3, :4)', [novoId,_nome, _classif, _idade], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}
exports.updateMarinheirosByID = async function (id, _nome, _idade, _classif){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute(`UPDATE MARINHEIROS SET CLASSIFICACAO = COALESCE(:1, CLASSIFICACAO), NOME = COALESCE(:2, NOME), IDADE = COALESCE(:3, IDADE) WHERE ID_MARINHEIRO = :4`, [_classif, _nome, _idade, id], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}
exports.deleteMarinheiro = async function (_idmarinheiro){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('DELETE FROM MARINHEIROS WHERE ID_MARINHEIRO= :1', [_idmarinheiro], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}