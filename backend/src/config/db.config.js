const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'localcloudmail_user',
  password: 'WreakHavoc@2023',
  database: 'localcloudmail_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
