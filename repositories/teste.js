const { OracleDB, dbConfig } = require('../database/barcos-marinheiros-db');

exports.getAllMarinheiros = async function () {
    let conn;
    try {
        conn = await OracleDB.getConnection(dbConfig);
        const result = await conn.execute(
            'SELECT * FROM MARINHEIROS',
            [],
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        return result.rows;
    } finally {
        if (conn) await conn.close();
    }
}