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