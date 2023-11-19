const sql = require('mssql')
const sqlConfig =new sql.ConnectionPool({
  user:'sa',
  password:'12345',
  database: 'testdb',
  server: 'LAPTOP-VSHJ2PGU\\SQLEXPRESS',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
});


module.exports = sqlConfig;