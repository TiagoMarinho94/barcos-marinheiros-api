const { OracleDB, dbConfig } = require('./database/barcos-marinheiros-db');

async function testar() {
    let conn;
    try {
        conn = await OracleDB.getConnection(dbConfig);
        console.log('✅ Ligação ao Oracle bem sucedida!');

        const result = await conn.execute(
            'SELECT * FROM marinheiros',
            [],
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        console.log('✅ Dados:', result.rows);
    }
    catch (err) {
        console.log('❌ Erro:', err.message);
    }
    finally {
        if (conn) await conn.close();
    }
}

testar();