// As credenciais estão aqui diretamente para facilitar a avaliação de forma a aceder às minhas tabelas com inserts
// Profissionalmente, devem ser guardadas em variáveis de ambiente (.env)
// Exemplo de implementação com dotenv disponível no ficheiro .env.example

//require('dotenv').config();
const OracleDB = require('oracledb');

OracleDB.fetchAsString = [OracleDB.CLOB];

const dbConfig = {
    user: '902508083', // process.env.db_user,
    password: 'qwerty', //process.env.db_password,
    connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=193.136.58.250)(PORT=1521))(CONNECT_DATA=(SID=formacao)))'
};

module.exports = { OracleDB, dbConfig };