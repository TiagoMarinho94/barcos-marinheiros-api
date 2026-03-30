const { OracleDB, dbConfig } = require('../database/barcos-marinheiros-db');

exports.getReservasByIDMarinheiro = async function (_id){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT R.ID_MARINHEIRO, R.ID_BARCO, B.NOME AS NOME_BARCO, R.DATA FROM RESERVAS R JOIN BARCOS B ON B.ID_BARCO = R.ID_BARCO WHERE R.ID_MARINHEIRO = :1', [_id], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}
exports.createReserva = async function (_idmarinheiro, _idbarco, _data){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const dataFormatada = new Date(_data).toISOString().split('T')[0];
        const result = await lig.execute('INSERT INTO RESERVAS (ID_MARINHEIRO, ID_BARCO, DATA) VALUES (:1, :2, TO_DATE(:3, \'YYYY-MM-DD\'))', [_idmarinheiro, _idbarco, dataFormatada], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}
exports.deleteReserva = async function (_idmarinheiro, _idbarco, _data){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const dataFormatada = new Date(_data).toISOString().split('T')[0];
        const result = await lig.execute('DELETE FROM RESERVAS WHERE ID_MARINHEIRO= :1 AND ID_BARCO = :2 AND TRUNC(DATA) =TO_DATE(:3, \'YYYY-MM-DD\') AND TRUNC(DATA) > TRUNC(SYSDATE)', [_idmarinheiro, _idbarco, dataFormatada], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        await lig.commit();
        return result.rowsAffected;
    } finally {
        if (lig) await lig.close();
    }
}
exports.getReservaByIDMarinheiroData = async function (_idmarinheiro, _data){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const dataFormatada = new Date(_data).toISOString().split('T')[0];
        const result = await lig.execute('SELECT * FROM RESERVAS WHERE ID_MARINHEIRO = :1 AND TRUNC(DATA) = TO_DATE(:2, \'YYYY-MM-DD\')', [_idmarinheiro, dataFormatada], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}
exports.getReservaByIDBarcoData = async function (_idbarco, _data){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const dataFormatada = new Date(_data).toISOString().split('T')[0];
        const result = await lig.execute('SELECT * FROM RESERVAS WHERE ID_BARCO = :1 AND TRUNC(DATA) = TO_DATE(:2, \'YYYY-MM-DD\')', [_idbarco, dataFormatada], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}
exports.getAllReservas = async function (){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT R.ID_MARINHEIRO, M.NOME AS NOME_MARINHEIRO, R.ID_BARCO, B.NOME AS NOME_BARCO, R.DATA FROM RESERVAS R JOIN MARINHEIROS M ON R.ID_MARINHEIRO = M.ID_MARINHEIRO JOIN BARCOS B ON R.ID_BARCO = B.ID_BARCO', [], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}
exports.getReservasByIDBarco = async function (_id){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT R.ID_MARINHEIRO, R.ID_BARCO, B.NOME AS NOME_BARCO, R.DATA FROM RESERVAS R JOIN BARCOS B ON B.ID_BARCO = R.ID_BARCO WHERE R.ID_BARCO = :1', [_id], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}