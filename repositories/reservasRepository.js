const { OracleDB, dbConfig } = require('../database/barcos-marinheiros-db');

exports.getReservasByIDMarinheiro = async function (id){
    let lig;
    try{
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT R.ID_MARINHEIRO, R.ID_BARCO, B.NOME AS NOME_BARCO, R.DATA FROM RESERVAS R JOIN BARCOS B ON B.ID_BARCO = R.ID_BARCO WHERE R.ID_MARINHEIRO = :1', [id], {outFormat: OracleDB.OUT_FORMAT_OBJECT});
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}