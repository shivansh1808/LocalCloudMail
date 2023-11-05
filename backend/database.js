const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'localcloudmail_user', // or 'root'
  password: 'WreakHavoc@2023',
  database: 'localcloudmail_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});
