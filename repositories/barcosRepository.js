const { OracleDB, dbConfig } = require('../database/barcos-marinheiros-db');

exports.getAllBarcos = async function () {
    let lig;
    try {
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT * FROM BARCOS', [], { outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}
exports.createBarco = async function (_nome, _cor){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        //procurar o maior ID existente
        const maxIdBarco = await lig.execute('SELECT NVL(MAX(ID_BARCO),0) + 1 AS NOVO_ID_BARCO FROM BARCOS', [], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        const novoIdBarco = maxIdBarco.rows[0].NOVO_ID_BARCO;
        //inserir agora os novos dados na tabela
        const result = await lig.execute('INSERT INTO BARCOS (ID_BARCO, NOME, COR) VALUES (:1, :2, :3)', [novoIdBarco,_nome, _cor], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}
exports.getBarcosByID = async function (id) {
    let lig;
    try {
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT * FROM BARCOS WHERE ID_BARCO = :1', [id], { outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows[0];
    } finally {
        if (lig) await lig.close();
    }
}
exports.getBarcosDisponibilidade = async function (_data){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const dataFormatada = new Date(_data).toISOString().split('T')[0];
        const result = await lig.execute('SELECT ID_BARCO, NOME AS NOME_BARCO FROM BARCOS WHERE ID_BARCO NOT IN (SELECT ID_BARCO FROM RESERVAS WHERE TRUNC(DATA)= TO_DATE(:1, \'YYYY-MM-DD\'))', [dataFormatada], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}
exports.updateBarcoByID = async function (id, _nome, _cor){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('UPDATE BARCOS SET NOME = COALESCE(:1, NOME), COR = COALESCE(:2, COR) WHERE ID_BARCO = :3', [_nome, _cor,id], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}
exports.deleteBarco = async function (_idbarco){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('DELETE FROM BARCOS WHERE ID_BARCO= :1', [_idbarco], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}