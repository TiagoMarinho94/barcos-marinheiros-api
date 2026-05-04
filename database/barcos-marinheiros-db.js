require('dotenv').config();
const OracleDB = require('oracledb');

OracleDB.fetchAsString = [OracleDB.CLOB];

const dbConfig = {
    user: process.env.db_user,
    password: process.env.db_password,
    connectString: process.env.db_connect_string
};

module.exports = { OracleDB, dbConfig };