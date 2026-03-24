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
exports.updateMarinheirosByID = async function (id){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('UPDATE MARINHEIROS SET CLASSIFICACAO = :1 WHERE ID_MARINHEIRO = :2', [id], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}