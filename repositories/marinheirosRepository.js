const { OracleDB, dbConfig } = require('../database/barcos-marinheiros-db');

exports.getAllMarinheiros = async function () {
    let lig;
    try {
        lig = await OracleDB.getConnection(dbConfig);
        const result = await lig.execute('SELECT * FROM MARINHEIROS', [], { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        return result.rows;
    } finally {
        if (lig) await lig.close();
    }
}