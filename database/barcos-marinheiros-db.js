const OracleDB = require('oracledb');

OracleDB.fetchAsString = [OracleDB.CLOB];

const dbConfig = {
    user: '902508083',
    password: 'qwerty',
    connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=193.136.58.250)(PORT=1521))(CONNECT_DATA=(SID=formacao)))'
};

module.exports = { OracleDB, dbConfig };